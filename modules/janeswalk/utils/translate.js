/**
 * i18n translation class
 *
 * @param object translations A map of i18next-format translations
 */

// sprintf tokenizer
function sprintf(str, ...args) {
  return str.replace(/%(s|d)/g, () => args.shift());
}

function I18nTranslator(translations) {
  if (translations) {
    this.translations = translations;
  }
}

// Prototype methods
Object.assign(I18nTranslator.prototype, {
  // The big translations map
  translations: {},

  /**
   * Basic translation.
   * sprintf syntax used to replace %d and %s tokens with arguments
   */
  translate(str, ...args) {
    const [translation] = this.translations[str] || [];
    return sprintf((translation || str), ...args);
  },

  /*
   * Tagged template literal
   * Turn a tagged template into a sprintf format
   */
  translateTag(strings, ...values) {
    return this.translate(strings.join('%s'), ...values);
  },

  /**
   * Plural translations
   * Different languages make different numbers plural (eg is 0 plural or not)
   * Translations should provide conjugation only, and make no assumptions about
   * the nature of the data.
   *
   * @param string singular
   * @param string plural
   * @param int count
   * @return string
   * @example t2('%d ox', '%d oxen', numberOfOxen)
   */
  translatePlural(singular, plural, count) {
    // TODO Use the plural rules for the language, not just English
    const isPlural = (count !== 1) ? 1 : 0;

    const translateTo = (this.translations[`${singular}_${plural}`] || [singular, plural])[isPlural];
    return sprintf(translateTo, count);
  },

  /**
  * Translate with context
  * Some words mean different things based on context, so
  * use tc to give context.
  *
  * @param string context
  * @param string str Sprintf-formatted string
  * @return string
  * @example tc('make or manufacture', 'produce'); tc('food', 'produce');
  */
  translateContext(context, str, ...args) {
    // i18n lib makes context keys simply an underscore between them
    sprintf(`${context}_${str}`, ...args);
  },
});

module.exports = I18nTranslator;
