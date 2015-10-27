/**
 * i18n Translations
 *
 * Translate text content into our available translations using
 * the i18n standard.
 */

import {dispatch} from '../dispatcher/AppDispatcher.js';
import {ActionTypes} from '../constants/JWConstants.js';

// Load all loop data
export function receive(translations) {
  dispatch({
    type: ActionTypes.I18N_RECEIVE,
    translations: translations
  });
}
