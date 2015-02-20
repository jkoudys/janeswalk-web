/* 
 * Helpers for building React pages with
 *
 * Try to only put things in here after exhausting all possible other options,
 * and review this file periodically to see what can be removed as new features
 * are added to React.
 */

// Render a JSX fragment into a <span> wrapper. Helpful when an API takes a Node
// as the input, e.g. Google Maps
exports.renderAsNode = function(reactElement) {
  var returnEl = document.createElement('span');
  React.render(returnEl, reactElement);
  return returnEl;
};

// Not a generalized Object => Array, rather a convertor to change
// {0: 'a', 1: 'b', 2: 'c'} into ['a','b','c']. Use only to convert
// obsolete encodings of walks into proper arrays
exports.objectToArray = function(obj) {
  var destination = [];

  // Assign numeric index in object as array index
  for (var i in obj) {
    destination[i] = obj[i];
  }

  // Needed to remove any empty elements, e.g. if input obj counts from 1 not 0
  return destination.filter(function(n) { return n !== undefined; });
};

