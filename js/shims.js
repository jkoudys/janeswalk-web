/* eslint-disable */
// Shims, polyfills, etc.

if (!window.Intl) {
  require('intl');
  require('intl/locale-data/jsonp/en.js');
}

if (!window.fetch) require('whatwg-fetch');
