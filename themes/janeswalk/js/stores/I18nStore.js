/**
 * i18n Store
 *
 * Store for i18n language translations
 */

// Basic flux setup
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/JWConstants').ActionTypes;

// The library for managing translations
var I18nTranslator = require('../helpers/translate.js');

// Simple 'something has changed' event
var CHANGE_EVENT = 'change';

// Local vars
var _i18n = new I18nTranslator();

const I18nStore = Object.assign({}, EventEmitter.prototype, {
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
      _i18n.constructor(payload.translations);
      I18nStore.emitChange();
    break;
    default:
      // do nothing
  }
});

module.exports = I18nStore;
