/**
 * City store
 *
 * Single-city storage. May be refactored for multiple cities later, but
 * currently no requirement exists for this.
 */

import { register2 } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';
import Store from './Store';

// Store singletons
let _city;

const CityStore = Object.assign({}, Store, {
  getCity: () => _city,
  getLocation: () => _city && _city.latlng,

  dispatchToken: register2({
    [AT.CITY_RECEIVE]: ({ city }) => { _city = city; },
  }, () => CityStore.emitChange()),
});
export default CityStore;
