$('.uploadBtn').click(function() {
  var btn = $(this);
  if (btn.html() != 'Upload') {
    return ;
  }
  btn.html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
  $.get('/upload/' + $(this).attr('id'), function(data) {
    btn.html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
  }).fail(function(data) {
    btn.html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
  });
});
