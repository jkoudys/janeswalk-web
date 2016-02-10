/**
 * Map Store
 *
 * The map, markers, and route line that walks follow
 */

// Requires
import {ActionTypes} from '../constants/JWConstants.js';
import {register} from 'janeswalk/dispatcher/AppDispatcher';
import Store from './Store.js';

let _markers = [];
let _route = [];

/**
 * Receive the full map
 */
function receiveMap(map) {
  _markers = map.markers;
  _route = map.route;
}

/**
 * Add a new member to the end of the team
 * @param object member
 */
function receiveMember(member) {
  _team.push(member);
}

const MapStore = Object.assign({}, Store, {
  getMarkers() {
    return _markers;
  },

  getRoute() {
    return _route;
  },

  getApi() {
    return {map: {markers: _markers, route: _route}};
  }
});

// Register our dispatch token as a static method
MapStore.dispatchToken = register(function(payload) {
  // Go through the various actions
  switch(payload.type) {
    // Route actions
    case ActionTypes.WALK_RECEIVE:
      receiveMap(payload.walk.data.map);
      MapStore.emitChange();
    break;
    default:
      // do nothing
  }
});

export default MapStore;
