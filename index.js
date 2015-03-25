"use strict";

module.exports = {
    build: function (options, cb) {
        require('./build')(options, cb);
    },
    languagePackPath: function languagePackPath(locality) {
        return locality.language + '-' + locality.country + '/_languagepack.js';
    }
};
