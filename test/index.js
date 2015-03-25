"use strict";

var test = require('tape');
var path = require('path');
var fs = require('fs');

var bksb = require('../');

test('build with no options', function (t) {
	var root = path.resolve(__dirname, 'fixture');
	bksb.build({}, function (err) {
		t.error(err, 'no error');

		fs.readFile(path.resolve(root, '.build/en-XC/_languagepack.js'), 'utf-8', function (err, data) {
			/*jshint evil:true */
			t.error(err, 'no error loading result');

			var result = {};
			function define(name, mod) {
				result[name] = mod();
			}
			eval(data);

			t.ok(result._languagepack['en-XC'], "found our language in the output");
			t.equal(result._languagepack['en-XC']['index.properties'].hello, 'World', "found translation");
		});

	});
	t.end();
});


test('build with appRoot', function (t) {
	var root = path.resolve(__dirname, 'fixture');
	bksb.build({appRoot: root}, function (err) {
		t.error(err, 'no error');

		fs.readFile(path.resolve(root, '.build/en-XC/_languagepack.js'), 'utf-8', function (err, data) {
			/*jshint evil:true */
			t.error(err, 'no error loading result');

			var result = {};
			function define(name, mod) {
				result[name] = mod();
			}
			eval(data);

			t.ok(result._languagepack['en-XC'], "found our language in the output");
			t.equal(result._languagepack['en-XC']['index.properties'].hello, 'World', "found translation");
		});

	});
	t.end();
});

test('build with buildRoot', function (t) {
	var root = path.resolve(__dirname, 'fixture');
	var buildRoot = path.resolve(__dirname, '.build/');
	bksb.build({appRoot: root, buildRoot: buildRoot}, function (err) {
		t.error(err, 'no error');

		fs.readFile(path.resolve(buildRoot, 'en-XC/_languagepack.js'), 'utf-8', function (err, data) {
			/*jshint evil:true */
			t.error(err, 'no error loading result');

			var result = {};
			function define(name, mod) {
				result[name] = mod();
			}
			eval(data);

			t.ok(result._languagepack['en-XC'], "found our language in the output");
			t.equal(result._languagepack['en-XC']['index.properties'].hello, 'World', "found translation");
		});

	});
	t.end();
});

test('languge pack path', function (t) {
    t.equal(bksb.languagePackPath({
        country: "XC",
        language: "en"
    }), 'en-XC/_languagepack.js');
    t.end();
});

