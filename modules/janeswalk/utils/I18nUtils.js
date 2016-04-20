import * as I18nActions from '../actions/I18nActions.js';

/**
 * Load translations file from JanesWalk
 *
 * @param object locale The locale definition, including name and url to messages
 */
export function getTranslations(locale) {
  // Check that we have a translations file set
  if (locale && locale.translation) {
    // Grab from session if we have it
    const translation = sessionStorage.getItem(`i18n_${locale.name}`);
    if (translation) {
      I18nActions.receive(JSON.parse(translation).translations['']);
    } else {
      fetch(locale.translation)
      .then(res => res.json())
      .then(data => {
        // Store with the session
        sessionStorage.setItem(`i18n_${locale.name}`, JSON.stringify(data));

        // Trigger i18n change on complete
        I18nActions.receive(data.translations['']);
      })
      .catch(({ message }) => console.error(`Failed to fetch translations: ${message}`));
    }
  }
}
