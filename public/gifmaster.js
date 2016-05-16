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
    var tiled = false;
    var tiledQuery = GetQueryStringParams('tiled');
    if (tiledQuery) {
        tiled = true;
    }
    var da_image_content;
    var query = GetQueryStringParams('query');
    var q = GetQueryStringParams('q');
    var savedUrl;
    var slug;
    var getSlug;
    var imgPath;
    var h1_query
    var slugFromUrl = GetQueryStringParams('slug');
    if (slugFromUrl) {
        imgPath = 'http://media0.giphy.com/media/' + slugFromUrl + '/giphy.gif';
        h1_query = decodeURIComponent(q).replace(/\+/g, ' ');
        if (h1_query.length >= 24) {
            h1_query = h1_query.substring(0, 24) + '...';
        };
        $("h1#your_query_search").text(h1_query);
        $('#gifmaster_it_up').css('background-image', 'url(' + imgPath + ')');
        $('.saved').html("<h2>Saved</h2>");
        if ($('#saved').hasClass('hidden')) {
            $('#saved').removeClass('hidden');
            $('#save').addClass('hidden');
        };
} else {
    if (query) {
        // var request = 'http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=dc6zaTOxFJmzC';
        var request = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + query;
        $.getJSON(request, function(data) {
            getSlug = function() {
                var index = data.data.image_original_url.split('/');
                return index[4];
            };
            // console.log(data.data);
            if (data.data.image_original_url) {
                if ($('#twitt').hasClass('un-hidden')) {
                    /* todo: clean this up */
                } else {
                    $('#twitt').removeClass('un-hidden')
                };
                slug = getSlug(data.data.image_original_url);
                console.log(slug);
                $('#save').click(function() {
                    savedUrl = '?slug=' + slug + '&q=' + query;
                    $(location).attr("href", savedUrl);
                    $('#saved').removeClass('hidden');
                });
                imgPath = 'http://i.giphy.com/' + slug + '.gif';
                $('#gifmaster_it_up').css('background-image', 'url(' + imgPath + ')');
                h1_query = decodeURIComponent(query).replace(/\+/g, ' ');
                if (h1_query.length >= 24) {
                    h1_query = h1_query.substring(0, 24) + '...';
                };
                $("h1#your_query_search").text(h1_query);
                // da_image_content = '<meta property="og:image" content="' + imgPath + '"/>' +
                //     '<meta property="og:url" content="' + imgPath + '"/>' +
                //     '<meta property="og:title" content="' + h1_query + '">' +
                //     '<meta property="og:description" content="' + h1_query + '">' +
                //     '<meta property="twitter:image" content="' + imgPath + '">';
                // $('head').append(da_image_content);
            } else {
                $('#gifmaster_it_up').css('background-image', 'url(http://i.giphy.com/i8HONP9VaTV6w.gif)');
                $("h1#your_query_search").text('I got nuthin');
            }
        });
    } else {
        var request = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=';
        $.getJSON(request, function(data) {
            getSlug = function() {
                var index = data.data.image_original_url.split('/');
                return index[4];
            };
            slug = getSlug(data.data.image_original_url);
            imgPath = 'http://media0.giphy.com/media/' + slug + '/giphy.gif';
            console.log(data.data);
            $('#gifmaster_it_up').css('background-image', 'url(' + imgPath + ')');
            $("#link").attr("href", imgPath);
            $("#link2").attr("href", imgPath);

            if ($('#twitt').hasClass('un-hidden')) {
                /* todo: clean this up */
            } else {
                $('#twitt').removeClass('un-hidden')
            };
            slug = getSlug(data.data.image_original_url);
            console.log(slug);
            $('#save').click(function() {
                savedUrl = '?slug=' + slug + 'q=gr8';
                $(location).attr("href", savedUrl);
            });
        });
    }
};
if ($('#gifmaster_it_up').hasClass("tiled")) {
    tiled = true;
} else {
    tiled = false;
}
$('#tile').click(function() {
    if (tiled) {
        tiled = false;
        $('#gifmaster_it_up').removeClass("tiled");
    } else {
        tiled = true;
        $('#gifmaster_it_up').addClass("tiled");
    }
});
});
