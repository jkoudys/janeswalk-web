/**
 * i18n Store
 *
 * Store for i18n language translations
 */
'use strict';

// Basic flux setup
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/JWConstants').ActionTypes;

// The library for managing translations
var I18nTranslate = require('../helpers/translate.js');

// Simple 'something has changed' event
var CHANGE_EVENT = 'change';

// Local vars
var _i18n = new I18nTranslate();

/**
 * Load translations file from JanesWalk
 *
 * @param string locale The i18n standard locale name, e.g. es_ES, en_US, etc.
 * @param function cb Callback to execute on translations load success
 */
function loadTranslations(locale, cb) {
  // Check that we have a translations file set
  if (locale.translation) {
    // Pull translations JSON from JW backend
    $.ajax({
      url: locale.translation,
      dataType: 'json',
      success: function(data) {
        // Load translations
        _i18n = _i18n.constructor(data.translations['']);
        // Complete callback, if set
        if (cb instanceof Function) {
          cb();
        }
      }
    });
  }
}

var I18nStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getTranslate: function() {
    return _i18n.translate.bind(_i18n);
  },

  getTranslatePlural: function() {
    return _i18n.translatePlural.bind(_i18n);
  }
});

// Register our dispatch token as a static method
I18nStore.dispatchToken = AppDispatcher.register(function(payload) {
  // Go through the various actions
  switch(payload.type) {
    // POI actions
    case ActionTypes.I18N_RECEIVE:
      loadTranslations(payload.locale, I18nStore.emitChange.bind(I18nStore));
    break;
    default:
      // do nothing
  }
});

module.exports = I18nStore;
