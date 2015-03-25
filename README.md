makara-amdify
=============

i18n transport for AMD modular apps served by Kraken.js

Use
---

Builds AMD bundles defining `_languagepack` for each locale in `projectRoot/locales`

```js
var ma = require('makara-amdify');
ma.build({
	buildRoot: '.build',
	appRoot: '.'
}, cb);
```

Additional features:

`ma.localesPath()`: returns the path relative to the `projectRoot/.build/` of the compiled assets, suitable for tacking onto the end of a CDN root or static server root for use in applications.
