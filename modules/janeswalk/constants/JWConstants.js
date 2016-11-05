/**
 * Basic constants for route app
 */

// The action names sent to the Dispatcher
const ActionTypes = [
  // i18n translations
  'I18N_RECEIVE',

  // Walks
  'WALK_RECEIVE',
  'WALK_RECEIVE_ALL',
  'WALK_SAVE',
  'WALK_PUBLISH',

  // City
  'CITY_RECEIVE',

  // Areas
  'AREA_RECEIVE',

  // Users
  'USER_RECEIVE',
  'USER_RECEIVE_ALL',

  // Itineraries
  'ITINERARY_RECEIVE',
  'ITINERARY_REMOVE_WALK',
  'ITINERARY_ADD_WALK',
  'ITINERARY_SCHEDULE_WALK',
  'ITINERARY_UNSCHEDULE_WALK',
  'ITINERARY_UPDATE_TITLE',
  'ITINERARY_UPDATE_DESCRIPTION',
  'ITINERARY_CREATE_LIST',
  'ITINERARY_RECEIVE_ALL',
  'ITINERARY_SYNC_START',
  'ITINERARY_SYNC_END',
].reduce((p, k) => { p[k] = Symbol(k); return p; }, {});

const keys = {
  google: 'AIzaSyA4iGa8LuLYBdttynMXjO9Vy6JaqaiPuVw',
};

export { ActionTypes, keys };
