'use strict';

var path = require('path');
var fs = require('fs');

var wrap = function(out) {
	return 'define("_languagepack", function () { return ' + JSON.stringify(out) + '; });';
};

var writer = function(outputRoot, cb) {
	return function(out) {
		fs.writeFile(path.resolve(outputRoot, '_languagepack.js'), wrap(out), cb);
	};
};

module.exports = function build(appRoot, cb) {
	require('makara-builder')({
		appRoot: root,
		writer: writer,
		cb: cb
	});
};
