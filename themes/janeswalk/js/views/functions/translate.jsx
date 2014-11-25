// Translation functions - TODO build an object of the translateables, then get their translations from the server
module.exports = function(str) {
  return sprintf.apply(null, arguments);
}

