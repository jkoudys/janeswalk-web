/**
 * i18n Translations
 *
 * Translate text content into our available translations using
 * the i18n standard.
 */

import {dispatch} from '../dispatcher/AppDispatcher.js';
import {ActionTypes} from '../constants/JWConstants.js';

// Load all loop data
export function receive(areas) {
  Object.keys(areas).forEach(name => {
    dispatch({
      type: ActionTypes.AREA_RECEIVE,
      name: name,
      content: areas[name]
    });
  });
}
