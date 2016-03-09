/**
 * i18n Store
 *
 * Store for i18n language translations
 */

// Basic flux setup
import {EventEmitter} from 'events';
import {register2} from 'janeswalk/dispatcher/AppDispatcher';
import {ActionTypes as AT} from 'janeswalk/constants/JWConstants';
import {changeMethods} from 'janeswalk/utils/Stores';

// The library for managing translations
import I18nTranslator from '../utils/translate.js';

// Local vars
const _i18n = new I18nTranslator();

const I18nStore = Object.assign({}, EventEmitter.prototype, changeMethods, {
  getTranslate: () => _i18n.translate.bind(_i18n),
  getTranslatePlural: () => _i18n.translatePlural.bind(_i18n),

  // Register our dispatch token as a static method
  dispatchToken: register2({
    [AT.I18N_RECEIVE]: ({translations}) => _i18n.constructor(translations)
  }, () => I18nStore.emitChange())
});

export default I18nStore;
export let t = I18nStore.getTranslate();
export let t2 = I18nStore.getTranslatePlural();
