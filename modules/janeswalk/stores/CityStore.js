/**
 * City store
 *
 * Single-city storage. May be refactored for multiple cities later, but
 * currently no requirement exists for this.
 */

import {dispatch, register2} from 'janeswalk/dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes as AT} from 'janeswalk/constants/JWConstants';
import {changeMethods} from 'janeswalk/utils/Stores';

// Store singletons
let _city;

const CityStore = Object.assign({}, EventEmitter.prototype, changeMethods, {
  getCity: () => _city,
  getLocation: () => _city && _city.latlng,

  dispatchToken: register2({
    [AT.CITY_RECEIVE]: ({city}) => _city = city
  }, () => CityStore.emitChange())
})
export default CityStore;
