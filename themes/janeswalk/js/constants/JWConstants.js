/**
 * Basic constants for route app
 */

module.exports = {
  // The action names sent to the Dispatcher
  ActionTypes: (function() {
    var keys = {};

    // Build properties and key names from array
    [
      // i18n translations
      'I18N_RECEIVE',
    ].forEach(function(key) {
      keys[key] = key;
    });
    return keys;
  })(),
}
