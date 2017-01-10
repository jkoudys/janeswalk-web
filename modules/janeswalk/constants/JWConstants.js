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

  // Walk Builder
  'WB_RECEIVE_WALK',
  'WB_REMOVE_ACCESSIBLE',
  'WB_REMOVE_IMAGE',
  'WB_REMOVE_THEME',
  'WB_SET_ACCESSIBLE',
  'WB_SET_DURATION',
  'WB_SET_IMAGE',
  'WB_SET_LONG_DESCRIPTION',
  'WB_SET_SHORT_DESCRIPTION',
  'WB_SET_THEME',
  'WB_SET_TIME',
  'WB_SET_TITLE',
  'WB_SET_ACCESSIBLE_INFO',
  'WB_SET_ACCESSIBLE_TRANSIT',
  'WB_SET_ACCESSIBLE_FIND',
  'WB_TEAM_ADD',
  'WB_TEAM_REMOVE',
  'WB_TEAM_UPDATE',
  'WB_POINT_ADD',
  'WB_POINT_REMOVE',
  'WB_POINT_UPDATE',
  'WB_POINT_INDEX',
  'WB_POINT_UNDO',

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
