/**
 * i18n Translations
 *
 * Translate text content into our available translations using
 * the i18n standard.
 */

import {dispatch} from 'janeswalk/dispatcher/AppDispatcher';
import {ActionTypes} from 'janeswalk/constants/JWConstants.js';

// Load all loop data
export function receive(translations) {
  dispatch({
    type: ActionTypes.I18N_RECEIVE,
    translations: translations
  });
}
