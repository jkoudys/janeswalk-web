/**
 * i18n Translations
 *
 * Translate text content into our available translations using
 * the i18n standard.
 */

import {dispatch} from 'janeswalk/dispatcher/AppDispatcher';
import {ActionTypes} from 'janeswalk/constants/JWConstants';

// Load all loop data
export function receive(user) {
  dispatch({
    type: ActionTypes.USER_RECEIVE,
    user: user
  });
}
