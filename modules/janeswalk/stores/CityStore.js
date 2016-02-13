/**
 * City store
 *
 * Single-city storage. May be refactored for multiple cities later, but
 * currently no requirement exists for this.
 */

import {dispatch, register} from 'janeswalk/dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes} from 'janeswalk/constants/JWConstants';

const CHANGE_EVENT = 'change';

// Store singletons
let _city;

// Receive a single walk
function receiveCity(city) {
  _city = city;
}

const CityStore = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCity() {
    return _city;
  },

  // Register our dispatch token as a static method
  dispatchToken: register(function(payload) {
    // Go through the various actions
    switch(payload.type) {
      // Route actions
      case ActionTypes.CITY_RECEIVE:
        receiveCity(payload.city);
      break;
    }
    CityStore.emitChange();
  })
});

export default CityStore;
