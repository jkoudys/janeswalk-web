/**
 * City store
 *
 * Single-city storage. May be refactored for multiple cities later, but
 * currently no requirement exists for this.
 * Includes filters for the City Walks.
 */

import { register } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';
import Store from './Store';

// Store singletons
let _city;
let _filters;

const CityStore = {
  ...Store,
  getCity: () => _city,
  getLocation: () => _city && _city.latlng,
  getFilters: () => _filters,

  dispatchToken: register({
    [AT.CITY_RECEIVE]: ({ city }) => { _city = city; },
    [AT.CITY_FILTERS_RECEIVE]: ({ filters }) => { _filters = filters; },
  }, () => CityStore.emitChange()),
};
export default CityStore;
