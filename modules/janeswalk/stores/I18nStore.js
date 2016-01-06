/**
 * i18n Store
 *
 * Store for i18n language translations
 */

// Basic flux setup
import {EventEmitter} from 'events';
import {register} from 'janeswalk/dispatcher/AppDispatcher';
import {ActionTypes} from 'janeswalk/constants/JWConstants';

// The library for managing translations
import I18nTranslator from '../utils/translate.js';

// Simple 'something has changed' event
const CHANGE_EVENT = 'change';

// Local vars
const _i18n = new I18nTranslator();

const I18nStore = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getTranslate() {
    return _i18n.translate.bind(_i18n);
  },

  getTranslatePlural() {
    return _i18n.translatePlural.bind(_i18n);
  }
});

// Register our dispatch token as a static method
I18nStore.dispatchToken = register(payload => {
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

export default I18nStore;
export let t = _i18n.translate.bind(_i18n);
export let t2 = _i18n.translatePlural.bind(_i18n);
