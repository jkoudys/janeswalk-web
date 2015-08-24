/**
 * i18n translation class
 *
 * @param object translations A map of i18next-format translations
 */

// sprintf tokenizer
function sprintf(str) {
  var args = Array.prototype.slice.call(arguments);
  return args.shift().replace(/%(s|d)/g, function(){
    return args.shift();
  });
}

class I18nTranslator {
  constructor(translations) {
    if (translations) {
      this.translations = translations;
    } else {
      this.translations = {};
    }
  }

  /**
   * Basic translation.
   * sprintf syntax used to replace %d and %s tokens with arguments
   */
  translate(str) {
    var translated = Array.prototype.slice.call(arguments);
    translated[0] = (this.translations[str] || [str])[0];
    return sprintf.apply(this, translated);
  }

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
    var isPlural = (count !== 1) ? 1 : 0;

    var translateTo = (this.translations[singular + '_' + plural] ||
                       [singular, plural])[isPlural];

    return sprintf(translateTo, count);
  }

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
  translateContext(context, str) {
    // Grab the values to apply to the string
    var args = Array.prototype.slice.call(arguments, 2);
    // i18n lib makes context keys simply an underscore between them
    var key = context + '_' + str;
    sprintf.apply(this, [context, args]);
  }
}

export default I18nTranslator;
