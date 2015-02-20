"use strict";

module.exports = {
    build: function (root, cb) {
        require('./build')(root, cb);
    },
    languagePackPath: function languagePackPath(locality) {
        return locality.language + '-' + locality.country + '/_languagepack.js';
    }
};
