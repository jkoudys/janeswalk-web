/**
 * Accessible Store
 *
 * The accessibility settings, e.g. uneven terrain.
 */

import { ActionTypes as AT } from '../constants/JWConstants';
import { register2 } from 'janeswalk/dispatcher/AppDispatcher';
import Store from './Store';

const _desc = {
  find: '',
  info: '',
  parking: '',
  transit: '',
};

const _flags = {};

/**
 * Hashmap to build the property names used by the v1 API
 */
const apiMap = {
  find: 'accessibleFind',
  info: 'accessibleInfo',
  parking: 'accessibleParking',
  transit: 'accessibleTransit',
};

/**
 * Build accessible data from the walk
 * Loads according to v1 API
 * @param object walk The full walk
 */
function receiveWalk(walk) {
  // Load the accessibility flags
  const flags = Object.keys(walk.checkboxes).filter(flag => flag.indexOf('accessible-') === 0);
  // For v1, flags just named after the accessible-
  // TODO: build a configurable flags setting, so this can be modified in the CMS
  flags.forEach(flag => { _flags[flag.slice(11)] = walk.checkboxes[flag]; });

  // Load the descriptions
  Object.keys(apiMap).forEach(k => {
    if (apiMap[k] in walk) {
      _desc[k] = walk[apiMap[k]];
    }
  });
}

const AccessibleStore = {
  ...Store,
  getDescription: () => _desc,
  getFlags: () => _flags,

  getApi() {
    const ret = Object.keys(apiMap).reduce((o, k) => {
      o[apiMap[k]] = _desc[k];
      return o;
    }, {});
    ret.checkboxes = Object.keys(_flags).reduce((o, k) => {
      o[`accessible-${k}`] = _flags[k];
      return o;
    }, {});

    return ret;
  },

  // Register our dispatch token as a static method
  dispatchToken: register2({
    [AT.WALK_RECEIVE]: ({ data }) => receiveWalk(data),
  }, () => AccessibleStore.emitChange()),
};

export default AccessibleStore;
