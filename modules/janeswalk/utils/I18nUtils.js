/**
 * Load translations file from JanesWalk
 *
 * @param object locale The locale definition, including name and url to messages
 */
import { i18nConfig } from 'es2015-i18n-tag';

export async function getTranslations({ name: locales, translation: url }) {
  // Check that we have a translations file set
  if (locales) {
    // Grab from either local session, or fetch from server
    const translations = JSON.parse(sessionStorage.getItem(`i18n_${locales}`)) ||
      await fetch(url).then(r => r.json());

    i18nConfig({ locales, translations });

    sessionStorage.setItem(`i18n_${locales}`, JSON.stringify(translations));
  }
}
