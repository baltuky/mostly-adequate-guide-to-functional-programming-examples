requirejs.config({
                     paths: {
                         fp: '../../lib/fp',
                         fp_primitives: '../../lib/fp-primitives',
                         jquery: 'http://code.jquery.com/jquery-2.2.4.min'
                     }
                 });

require(['fp', 'fp_primitives', 'jquery'], function (_, fpp, $) {

    var Impure = {
        getJSON: curry(function (callback, url) {
            $.getJSON(url, callback);
        }),
        setHtml: curry(function (sel, html) {
            $(sel).html(html);
        })
    };

    var url = function (term) {
        return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' +
               term + '&format=json&jsoncallback=?';
    };

    var prop = curry(function (property, object) {
        return object[property];
    });

    var img = function (url) {
        return $('<img/>', {src: url});
    };

    var mediaUrl = compose(prop('m'), prop('media'));
    var mediaToImg = compose(img, mediaUrl);
    var images = compose(map(mediaToImg), prop('items'));
    var renderImages = compose(Impure.setHtml("body"), images);
    var app = compose(Impure.getJSON(renderImages), url);

    app("cats");
});
