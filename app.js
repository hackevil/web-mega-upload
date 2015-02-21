var mega = require('mega');
var fs = require('fs');
var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/assets'));

var dirPath;

if (process.argv.length < 3) {
  dirPath = '.';
}
else {
  dirPath = process.argv[2];
}

app.get('/', function(req, res) {
  var files = fs.readdirSync(dirPath);
  var infos = new Array();

  for (var i = 0; i < files.length; ++i) {
    infos.push({name: files[i], stats: fs.statSync(dirPath + '/' + files[i])});
  }

  res.render('index', {files: infos});
});

app.get('/upload/:name', function(req, res) {
  upload(dirPath + '/' + req.params.name, function() {
    res.status(200);
    res.end();
  });
});

var storage = mega({email: '', password: ''}, function() {
  app.listen(3000);
  console.log("App is online");
});

var getName = function(path) {
  var pathSplit = path.split('/');

  return pathSplit[pathSplit.length - 1];
}

var upload = function(path, cb) {
  fs.createReadStream(path).pipe(storage.upload(getName(path), function() {
    cb();
  }));
}
