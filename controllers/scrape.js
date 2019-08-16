'use strict';

var og = require('open-graph');
var request = require('request'),
    cheerio = require('cheerio');

/** to get metadata using URL */


exports.getMetaDataFromUrl = (req) => new Promise(function (resolve, reject, options) {
    var url = req.body.url;
    exports.getHTML(url, function (err, html) {
        if (err) {
            reject(err);
        }
        else {
            var parsedMeta = exports.parse(html, options);
            resolve(parsedMeta)
        }


    })

})


exports.getHTML = function (url, callback) {
    var urlData = require('url').parse(url);
    if (!urlData.protocol)
    urlData = require('url').parse("http://" + url);

    url = require('url').format(urlData);

    request({ url: url }, function (err, res, body) {
        if (err) {
            callback(err);
        }

        if (!err && res.statusCode === 200) {
            callback(null, body);
        }
        else {
            callback(new Error("Request failed with HTTP status code: " + request.response.statusCode));
        }
    })
}


exports.parse = function (htmlData, data) {

    data = data || {};

    if (typeof htmlData === 'string')
    htmlData = cheerio.load(htmlData);

    var namespace,
    htmlmetaData= htmlData('html');

    if (htmlmetaData.length) {
        var keyAttributes = Object.keys(htmlmetaData[0].attribs);
    }
    else if (data.strict) {
        return null;

    }

    if (!namespace)
        // If no namespace is explicitly set..
        if (data.strict) {
            // and strict mode is specified, abort parse.
            return null;
        }

        else {
            // and strict mode is not specific, then default to "og"
            namespace = "og";
        }


    var meta = {},
        metaTags = htmlData('meta');

    metaTags.each(function () {
        var element = htmlData(this),
            attr = element.attr('property');

           

        // If meta element isn't an "og:" property, skip it
        if (!attr || attr.substring(0, namespace.length) !== namespace)
            return;
            var image = [];
        var property = attr.substring(namespace.length + 1), content = element.attr('content');

        var key, tmp,
            ptr = meta,
            keys = property.split(':', 4);
        while (keys.length > 1) {
            key = keys.shift();

            if (Array.isArray(ptr[key])) {
                // the last index of ptr[key] should become
                // the object we are examining.
                tmp = ptr[key].length - 1;
                ptr = ptr[key];
                key = tmp;
            }

            if (typeof ptr[key] === 'string') {
                // if it's a string, convert it
                ptr[key] = { '': ptr[key] };
            } else if (ptr[key] === undefined) {
                // create a new key
                ptr[key] = {};
            }

            // move our pointer to the next subnode
            ptr = ptr[key];
        }

        // deal with the last key
        key = keys.shift();

        if (ptr[key] === undefined) {
            ptr[key] = content;
        } else if (Array.isArray(ptr[key])) {
            ptr[key].push(content);
        } else {
            ptr[key] = [ptr[key], content];
        }

    });

console.log(htmlData)

    // If no 'og:title', use title tag
    if (!meta.hasOwnProperty('title')) {
        meta['title'] = htmlData('title').text();
    }
    if (!meta.hasOwnProperty('description')) {
        meta['description'] = htmlData('description').text();
    }

    if (!meta.hasOwnProperty('image')) {
        var img = htmlData('img');

        // If there are image elements in the page
        if (img.length) {
            var imgObj = [];
            imgObj.url = htmlData('img').attr('src');

            // Set image width and height properties if respective attributes exist
            if (htmlData('img').attr('width'))
                imgObj.width = htmlData('img').attr('width');
            if (htmlData('img').attr('height'))
                imgObj.height = htmlData('img').attr('height');

            meta['image'] = imgObj;
        }

    }
    console.log(meta)
    return meta;
}




// Using open graph
exports.getMetaDataPropertiesUsingOpenGraph = (req) => new Promise(function (resolve, reject, options) {
    var url = req.body.url;
    og(url, function(err, meta) {
    if (err)
    {
        reject(err)
    }
    else {
        resolve(meta);
    }
})

})