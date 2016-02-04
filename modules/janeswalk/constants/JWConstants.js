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

  // Areas
  'AREA_RECEIVE',

  // Users
  'USER_RECEIVE',

  // Itineraries
  'ITINERARY_RECEIVE',
  'ITINERARY_REMOVE_WALK',
  'ITINERARY_ADD_WALK',
  'ITINERARY_UPDATE_TITLE',
  'ITINERARY_UPDATE_DESCRIPTION',
  'ITINERARY_CREATE_LIST',
  'ITINERARY_RECEIVE_ALL',
  'ITINERARY_SYNC_START',
  'ITINERARY_SYNC_END',

   // Dashboard
  'FILTER_WALKS',
  'TOGGLE_WALK_FILTER',
  'REMOVE_WALK_FILTER',
  'FILTER_WALKS_BY_DATE',
  'FILTER_LEADERS_BY_DATE',
  'SORT_LEADERS',
  'TOGGLE_MENU',

].reduce((p, k) => {p[k] = k; return p}, {});

export {ActionTypes};
