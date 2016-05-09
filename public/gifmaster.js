$(document).ready(function() {
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
    var da_image_content;
    var query = GetQueryStringParams('query');
    var slug;
    var imgPath;
    var h1_query;
    if (query) {
        // var request = 'http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=dc6zaTOxFJmzC';
        var request = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + query;
        $.getJSON(request, function(data) {
            var getSlug = function() {
                var index = data.data.image_original_url.split('/');
                return index[4];
            };
            // console.log(data.data);
            if (data.data.image_original_url) {
                slug = getSlug(data.data.image_original_url);
                $('#save').click(function() {
                    savedUrl = '?slug=' + slug;
                    $(location).attr("href", savedUrl);
                });
                imgPath = 'http://media0.giphy.com/media/' + slug + '/giphy.gif';
                $('#gifmaster_it_up').css('background-image', 'url(' + imgPath + ')');
                h1_query = decodeURIComponent(query).replace(/\+/g, ' ');
                if (h1_query.length >= 24) {
                    h1_query = h1_query.substring(0, 24) + '...';
                };
                $("h1#your_query_search").text(h1_query);
                da_image_content = '<meta property="og:image" content="' + imgPath + '"/>' +
                    '<meta property="og:url" content="' + imgPath + '"/>' +
                    '<meta property="og:title" content="' + h1_query + '">' +
                    '<meta property="og:description" content="' + h1_query + '">' +
                    '<meta property="twitter:image" content="' + imgPath + '">';
                $('head').append(da_image_content);
            } else {
                $('#gifmaster_it_up').css('background-image', 'url(http://i.giphy.com/i8HONP9VaTV6w.gif)');
                $("h1#your_query_search").text('I got nuthin');
            }
        });
    } else {
        var request = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=';
        $.getJSON(request, function(data) {
            slug = getSlug(data.data.image_original_url);
            imgPath = 'http://media0.giphy.com/media/' + slug + '/giphy.gif';
            var getSlug = function() {
                var index = data.data.image_original_url.split('/');
                return index[4];
            };
            console.log(data.data);
            $('#gifmaster_it_up').css('background-image', 'url(' + imgPath + ')');
            $("#link").attr("href", imgPath);
            $("#link2").attr("href", imgPath);
        });
        // $('#gifmaster_it_up').css('background-image', 'url(http://i.giphy.com/fxVfzwgh78K9a.gif)');
    }

    var slugFromUrl = GetQueryStringParams('slug');
    if (slugFromUrl) {
        imgPath = 'http://media0.giphy.com/media/' + slugFromUrl + '/giphy.gif';
        $('#gifmaster_it_up').css('background-image', 'url(' + imgPath + ')');
        da_image_content = '<meta property="og:image" content="' + imgPath + '"/>' +
            '<meta property="og:url" content="' + imgPath + '"/>' +
            '<meta property="og:title" content="' + h1_query + '">' +
            '<meta property="og:description" content="' + h1_query + '">' +
            '<meta property="twitter:image" content="' + imgPath + '">';
        $('head').append(da_image_content);
    }

    // $.urlParam = function(name){
    //     var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    //     if (results==null){
    //        return null;
    //     }
    //     else{
    //        return results[1] || 0;
    //     }
    // }

    // var tiled = GetQueryStringParams('tiled');
    //
    // $('#tile').click(function() {
    //     if (tiled) {
    //         if (tiled == true) {
    // $('#tile').click(function() {
    //   if $('#gifmaster_it_up').hasClass( "tiled" ) {
    //     // $('#gifmaster_it_up').addClass( "tiled" );
    //   } else $('#gifmaster_it_up').addClass( "tiled" );
    // });
    //             savedUrl = '&tiled=true';
    //             var fullUrl = window.location.href + savedUrl;
    //             $(location).attr("href", fullUrl);
    //         } else {
    //             savedUrl = '&tiled=false';
    //             var fullUrl = window.location.href + savedUrl;
    //             $(location).attr("href", fullUrl);
    //         }
    //     } else {
    //         savedUrl = '&tiled=true';
    //         var fullUrl = window.location.href + savedUrl;
    //         $(location).attr("href", fullUrl);
    //     }
    // });


    // $( "#hello" ).click(function() {
    //   console.log('logs');
    // });
    $('#reload').click(function() {
        location.reload();
    });

    $('#tile').click(function() {
        if ($('#gifmaster_it_up').hasClass("tiled")) {
            $('#gifmaster_it_up').removeClass("tiled");
        } else {
            $('#gifmaster_it_up').addClass("tiled");
        }
    });
});
