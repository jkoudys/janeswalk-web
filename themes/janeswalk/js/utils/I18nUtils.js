import I18nActions from '../actions/I18nActions.js';

/**
 * Load translations file from JanesWalk
 *
 * @param object locale The locale definition, including name and url to messages
 */
export function getTranslations(locale) {
  // Check that we have a translations file set
  if (locale && locale.translation) {
    // Grab from session if we have it
    const translation = window.sessionStorage.getItem('i18n_' + locale.name);
    if (translation) {
      I18nActions.receive(JSON.parse(translation).translations['']);
    } else {
      const xhr = new XMLHttpRequest();
      xhr.open('get', locale.translation, true);
      xhr.onload = function() {
        let data = JSON.parse(this.responseText);

        // Store with the session
        window.sessionStorage.setItem('i18n_' + locale.name, this.responseText);

        // Trigger i18n change on complete
        I18nActions.receive(data.translations['']);
      };
      xhr.send();
    }
  }
}
