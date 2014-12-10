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

function I18nTranslator(translations) {
  this.translations = translations;
}
// Static methods
Object.defineProperties(I18nTranslator, {
  // Non-translating translations functions
  noTranslate: {
    value: {
      translate: function() {
        return sprintf.apply(this, arguments);
      },
      translatePlural: function() {
        return sprintf.apply(this, arguments);
      },
      translateContext: function() {
        return sprintf.apply(this, arguments);
      }
    }
  }
});
// Prototype methods
Object.defineProperties(I18nTranslator.prototype, {
  // The big translations map
  translations: {
    value: {},
    writable: true,
    enumerable: true
  },

  /**
   * Basic translation.
   * sprintf syntax used to replace %d and %s tokens with arguments
   */
  translate: {
    value: function(str) {
      var translated = Array.prototype.slice.call(arguments);
      translated[0] = this.translations[str] || str;
      return sprintf.apply(this, translated);
    }
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
  translatePlural: {
    value: function(singular, plural, count) {
      // The key for the plural is not the plural value, but singular_plural
      // TODO
    }
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
  translateContext: {
    value: function(context, str) {
      // Grab the values to apply to the string
      var args = Array.prototype.slice.call(arguments, 2);
      // i18n lib makes context keys simply an underscore between them
      var key = context + '_' + str;
      sprintf.apply(this, [context, args]);
    }
  }
});

module.exports = I18nTranslator;
