/**
 * Basic constants for route app
 */

function mirror(arr) {
  var keys = {};
  arr.forEach(function(key) {
    keys[key] = key;
  });
  return keys;
}

// The action names sent to the Dispatcher (from actions to store)
export const ActionTypes = mirror([
  // i18n translations
  'I18N_RECEIVE',

  // Walks
  'WALK_RECEIVE',
  'WALK_CHANGE',

  // Notification logger
  'LOG_INFO',
  'LOG_ERROR',
  'LOG_WARN'
]);
