'use strict';

var I18nActions = require('../actions/I18nActions.js');

module.exports = {
  /**
   * Load translations file from JanesWalk
   *
   * @param object locale The locale definition, including name and url to messages
   */
  getTranslations: function(locale) {
    // Check that we have a translations file set
    if (locale.translation) {
      // Grab from session if we have it
      var translation = window.sessionStorage.getItem('i18n_' + locale.name);
      if (translation) {
        I18nActions.receive(JSON.parse(translation).translations['']);
      } else {
        var xhr = new XMLHttpRequest();
        xhr.open('get', locale.translation, true);
        xhr.onload = function() {
          var data = JSON.parse(this.responseText);

          // Store with the session
          window.sessionStorage.setItem('i18n_' + locale.name, this.responseText);

          // Trigger i18n change on complete
          I18nActions.receive(data.translations['']);
        };
        xhr.send();
      }
    }
  }
};
