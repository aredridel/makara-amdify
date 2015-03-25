"use strict";
var fs = require('fs');
var spundle = require('spundle');
var through = require('through2');
var path = require('path');
var glob = require('glob');
var async = require('async');
var mkdirp = require('mkdirp');
var iferr = require('iferr');
var FORMATTERS = {
    global: function(out) {
        return 'window.__MAKARA_AMDIFY__ = ' + JSON.stringify(out) + ';'
    },
    amd: function(out) {
		return 'define("_languagepack", function () { return ' + JSON.stringify(out) + '; });'
    }
};

module.exports = function build(options, cb) {
    var format = options.format || 'amd';
    var appRoot = options.appRoot || '.';
    var buildRoot =  options.buildRoot || path.resolve(appRoot, '.build');
    var localeRoot = path.resolve(appRoot, 'locales');

    glob(path.resolve(localeRoot, '*/*/'), function (err, paths) {
        if (err) {
            return cb(err);
        }

        var locales = paths.map(function (p) {
            var m = /(.*)\/(.*)/.exec(path.relative(localeRoot, p));
            return m[2] + '-' + m[1];
        });

        async.each(locales, streamLocale, cb);
    });

    function streamLocale(locale, cb) {
        var output = through();
        var m = /(.*)-(.*)/.exec(locale); // Use a real BCP47 parser.
        var outputRoot = path.join(buildRoot, locale);
        mkdirp(outputRoot, iferr(cb, function (out) {
            spundle(localeRoot, m[2], m[1], iferr(cb, function (out) {
                fs.writeFile(path.resolve(outputRoot, '_languagepack.js'), getFormattedOutput(format, out), cb);
            }));
        }));
    }

};

function getFormattedOutput(format, out) {
    return FORMATTERS[format](out);
}

function streamOf(str) {
    var o = through();
    process.nextTick(function () {
        o.end(str);
    });
    return o;
}
