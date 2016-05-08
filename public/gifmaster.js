function GetQueryStringParams(sParam)
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

var query = GetQueryStringParams('query');
if (query) {
   // var request = 'http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=dc6zaTOxFJmzC';
   var request = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + query;
   $.getJSON(request, function(data) {
    console.log(data.data);
    if (data.data.image_original_url) {
      $('#gifmaster_it_up').css('background-image', 'url(' + data.data.image_original_url + ')');
      var h1_query = decodeURIComponent(query).replace(/\+/g,' ');
      if (h1_query.length >= 24) {
        h1_query = h1_query.substring(0,24) + '...';
      }
      $( "h1#your_query_search" ).text(h1_query);
      $("#link").attr("href", data.data.image_original_url);
      $("#link2").attr("href", data.data.image_original_url);
    } else {
      $('#gifmaster_it_up').css('background-image', 'url(http://i.giphy.com/i8HONP9VaTV6w.gif)');
      $( "h1#your_query_search" ).text('I got nuthin');
      $("#link").attr("href", "http://i.giphy.com/i8HONP9VaTV6w.gif");
      $("#link2").attr("href", data.data.image_original_url);
    }
    da_image_content ='<meta property="og:image" content="' + data.data.image_original_url + '"/>' +
    '<meta property="og:url" content="' + data.data.image_original_url + '"/>' +
    '<meta property="og:title" content="' + h1_query + '">' +
    '<meta property="og:description" content="' + h1_query + '">'+
    '<meta property="twitter:image" content="' + data.data.image_original_url + '">';
    $('head').append(da_image_content);
  });
} else {
  var request = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=';
  $.getJSON(request, function(data) {
    console.log(data.data);
    $('#gifmaster_it_up').css('background-image', 'url(' + data.data.image_original_url + ')');
    $("#link").attr("href", data.data.image_original_url);
    $("#link2").attr("href", data.data.image_original_url);
     da_image_content ='<meta property="og:image" content="' + data.data.image_original_url + '"/>' +
    '<meta property="og:url" content="' + data.data.image_original_url + '"/>' +
    '<meta property="og:title" content="' + h1_query + '">' +
    '<meta property="og:description" content="' + h1_query + '">'+
    '<meta property="twitter:image" content="' + data.data.image_original_url + '">';
    $('head').append(da_image_content);
  });
  // $('#gifmaster_it_up').css('background-image', 'url(http://i.giphy.com/fxVfzwgh78K9a.gif)');
}

$('#tile').click(function() {
  $('#gifmaster_it_up').toggleClass( "tiled" );
});

// $( "#hello" ).click(function() {
//   console.log('logs');
// });
$('#reload').click(function() {
    location.reload();
});

// $("#link").click(function() {
//   window.open(data.data.image_original_url);
// });
