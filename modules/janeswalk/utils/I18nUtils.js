/**
 * Load translations file from JanesWalk
 *
 * @param object locale The locale definition, including name and url to messages
 */
import { i18nConfig } from 'es2015-i18n-tag';

export async function getTranslations({ locale, url } = {}) {
  // Check that we have a translations file set
  if (locale) {
    // Grab from either local session, or fetch from server
    const translations = JSON.parse(sessionStorage.getItem(`i18n_${locale}`)) ||
      await fetch(url).then(r => r.json());

    i18nConfig({ locale, translations });

    sessionStorage.setItem(`i18n_${locale}`, JSON.stringify(translations));
  }
}
