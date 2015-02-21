var mega = require('mega');
var fs = require('fs');
var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/assets'));

var dirPath;

var purgePath = function(path) {
  var i = path.length - 1;

  while (i >= 0) {
    if (path[i] != '/') {
      lastSlash = i;
      break;
    }
    --i;
  }

  return path.substr(0, lastSlash + 1);
}

if (process.argv.length < 3) {
  dirPath = '.';
}
else {
  dirPath = purgePath(process.argv[2]);
}

app.get('/', function(req, res) {
  var currentPath = req.query.path ? req.query.path + '/' : '';
  var files = fs.readdirSync(dirPath + '/' + currentPath);
  var infos = new Array();

  for (var i = 0; i < files.length; ++i) {
    infos.push({name: files[i], stats: fs.statSync(dirPath + '/' + currentPath + files[i])});
  }

  res.render('index', {files: infos, path: currentPath});
});

app.get('/upload/:name', function(req, res) {
  upload(dirPath + '/' + req.params.name, function() {
    res.status(200);
    res.end();
  });
});

var storage = mega({email: '', password: '', keepalive: false}, function() {
  app.listen(3000);
  console.log("App is online");
});

var getName = function(path) {
  var pathSplit = path.split('/');

  return pathSplit[pathSplit.length - 1];
}

var upload = function(path, cb) {
  var up = storage.upload({name: getName(path), size: fs.statSync(path).size}, function() {
    cb();
  });
  fs.createReadStream(path).pipe(up);
  up.on('progress', function(stats) {

  });
}
