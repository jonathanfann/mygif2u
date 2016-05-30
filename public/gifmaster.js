$(document).ready(function() {
    var GIPHY_ID;
    var tiledQuery = GetQueryStringParams('tiled');
    if (tiledQuery) {
        $('#gifmaster_it_up').addClass("tiled");
    }
    var q = GetQueryStringParams('q');
    var thisUrl = window.location.href;
    /* saved query */
    var slugFromUrl = GetQueryStringParams('slug');
    if (slugFromUrl) {
        $('#query').addClass('hidden');
        $('#button').text('Reset');
        SetGiph(slugFromUrl, q, tiledQuery);
        $('#copy').html(thisUrl);
        $('#copyimage').html('<img src="http://i.giphy.com/' + slugFromUrl + '.gif" /><p>Hold to Copy Image</p>');
        if ($('#saved').hasClass('hidden')) {
            $('#saved').removeClass('hidden');
            $('#save').addClass('hidden');
        }
        /* searches */
    } else {
      MakeItGr8Again();
    }
    /* tile */
    var tiled = tiledQuery !== undefined;
    $('#your_query_search').click(function() {
      tiled = !tiled;
      $('#gifmaster_it_up').toggleClass('tiled');
      // to query string based on `tiled` val
    });
    $('#save').click(function() {
      var query = $('#query').val();
      savedUrl = '?slug=' + GIPHY_ID + '&q=' + query;
      if (tiled == true) {
        savedUrl = savedUrl.concat('&tiled=true');
      }
      $(location).attr("href", savedUrl);
      $('#saved').removeClass('hidden');
    });
    $('#queryForm').submit(function(event) {
      $('#button').text('Search');
      $('#query').removeClass('hidden');
      var queryVal = $('#query').val();
      MakeItGr8Again(queryVal);
      var url = $(location).attr('href');
      if (url.indexOf('?') !== -1) {
        url = url.split('?').shift();
        $(location).attr('href', url);
      }
      event.preventDefault();
    });
    function GetQueryStringParams(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }
    function MakeItGr8Again(query) {
      SearchForGif(query, function(giphyId) {
        if (giphyId) {
          // tiled by default
          SetGiph(giphyId, query, true);
          // no tile
        } else {
          SetGiph('i8HONP9VaTV6w', 'I got nuthin');
        }
      });
    }

    // update giph display
    function SetGiph(giphyId, query, tiled) {
      if (query) {
        query = decodeURIComponent(query).replace(/\+/g, ' ');
        if (query.length >= 24) {
          query = query.substring(0, 24) + '...';
        }
        $("h1#your_query_search").text(query);
      }
      var imgPath = 'http://i.giphy.com/' + giphyId + '.gif';
      $('#gifmaster_it_up').css('background-image', 'url(' + imgPath + ')');
    }

    // send query to giphy, returns gif url via callback
    function SearchForGif(query, callback) {
      // var url = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC';
      var url = '/make-gr8';
      $.post(url, {searchTerm: query}).done(function(data) {
        GIPHY_ID = data.id;
        callback(data.id);
      });
    }
});



// da_image_content = '<meta property="og:image" content="' + imgPath + '"/>' +
//     '<meta property="og:url" content="' + imgPath + '"/>' +
//     '<meta property="og:title" content="' + h1_query + '">' +
//     '<meta property="og:description" content="' + h1_query + '">' +
//     '<meta property="twitter:image" content="' + imgPath + '">';
// $('head').append(da_image_content);
