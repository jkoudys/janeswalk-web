/**
 * Accessible Store
 *
 * The accessibility settings, e.g. uneven terrain.
 */

import {ActionTypes} from '../constants/JWConstants.js';
import 'Store' from './Store.js';

const _desc = {
  find: '',
  info: '',
  parking: '',
  transit: ''
};

const _flags = {};

/**
 * Hashmap to build the property names used by the v1 API
 */
const apiMap = {
  find: 'accessibleFind',
  info: 'accessibleInfo',
  parking: 'accessibleParking',
  transit: 'accessibleTransit'
};

/**
 * Build accessible data from the walk
 * Loads according to v1 API
 * @param object walk The full walk
 */
function receiveWalk(walk) {
  // Load the accessibility flags
  let flags = Object.keys(walk.checkboxes).filter(flag => flag.indexOf('accessible-') === 0);
  // For v1, flags just named after the accessible-
  // TODO: build a configurable flags setting, so this can be modified in the CMS
  flags.forEach(flag => _flags[flag.slice(11)] = walk.checkboxes[flag]);

  // Load the descriptions
  Object.keys(apiMap).forEach(k => {
    if (apiMap[k] in walk) {
      _desc[k] = walk[apiMap[k]];
    }
  });
}

/**
 * Add a new member to the end of the team
 * @param object member
 */
function receiveMember(member) {
  _team.push(member);
}

const AccessibleStore = Object.assign({}, Store, {
  getDescription() {
    return _desc;
  },

  getFlags() {
    return _flags;
  },

  getApi() {
    let ret = Object.keys(apiMap).reduce((o, k) => {
      o[apiMap[k]] = _desc[key];
      return o;
    }, {});
    ret.checkboxes = Object.keys(_flags).reduce((o, k) => {
      o['accessible-' + k] = _flags[k];
    }, {});

    return ret;
  }
});

// Register our dispatch token as a static method
AccessibleStore.dispatchToken = AppDispatcher.register(payload => {
  // Go through the various actions
  switch(payload.type) {
    // Receive a full walk
    case ActionTypes.WALK_RECEIVE:
      receiveWalk(payload.data);
      AccessibleStore.emitChange();
    break;
  }
});

export default AccessibleStore;
