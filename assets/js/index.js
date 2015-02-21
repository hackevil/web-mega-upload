$('.uploadBtn').click(function() {
  var btn = $(this);
  if (btn.html() != 'Upload') {
    return ;
  }
  btn.html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
  $.get('/upload/' + $(this).attr('id') + '?currentPath=' + getUrlParameter('path'), function(data) {
    btn.html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
  }).fail(function(data) {
    btn.html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
  });
});

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}
