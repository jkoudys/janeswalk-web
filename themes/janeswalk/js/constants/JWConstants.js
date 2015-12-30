/**
 * Basic constants for route app
 */

// The action names sent to the Dispatcher
const ActionTypes = [
  // i18n translations
  'I18N_RECEIVE',

  // Walks
  'WALK_RECEIVE',
  'WALK_SAVE',
  'WALK_PUBLISH',

  // Areas
  'AREA_RECEIVE'
].reduce((p, k) => {p[k] = k; return p}, {});

export {ActionTypes};
