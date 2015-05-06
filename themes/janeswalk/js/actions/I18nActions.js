/**
 * i18n Translations
 *
 * Translate text content into our available translations using
 * the i18n standard.
 */

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var JWConstants = require('../constants/JWConstants.js');

var ActionTypes = JWConstants.ActionTypes;

module.exports = {
  // Load all loop data
  receive: function(translations) {
    AppDispatcher.dispatch({
      type: ActionTypes.I18N_RECEIVE,
      translations: translations
    });
  }
};
