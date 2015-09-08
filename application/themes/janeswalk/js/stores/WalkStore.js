/**
 * Walk store
 *
 * A 'walk' is at the core of Jane's Walk - it tracks the schedule, route,
 * description, and people involved with a walk.
 */

import Store from './Store.js';
import {Events, ActionTypes} from '../constants/JWConstants.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import defaultWalk from '../constants/defaultWalk.json';

// Store singletons
// The Walk object, and its default params
let _walk = defaultWalk;
// @var string The service endpoint for this walk
let _url = '';

function receiveWalk(walk, url) {
  // Map the walk data
  _walk = [
    'id', 'title', 'initiatives', 'longDescription', 'shortDescription',
    'thumbnails', 'mirrors', 'wards'
  ].reduce((obj, cur) => { obj[cur] = walk.data[cur]; return obj; }, {});
  _url = walk.url;
}

const WalkStore = Object.assign({}, Store, {
  getWalk() {
    return _walk;
  },

  getUrl() {
    return _url
  },

  getApi() {
    return {};
  }
});

// Register our dispatch token as a static method
WalkStore.dispatchToken = AppDispatcher.register(function(payload) {
  // Go through the various actions
  switch(payload.type) {
    // Route actions
    case ActionTypes.WALK_RECEIVE:
      receiveWalk(payload.walk, payload.url);
      WalkStore.emitChange();
    break;
  }
})

export default WalkStore;
