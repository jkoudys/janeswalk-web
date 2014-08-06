/**
 * Initialization code goes here. This is not to be a dumping ground for
 * miscellaneous functions, and especially not a place to stick new global
 * variables.
 */
document.addEventListener('DOMContentLoaded', function() {
  var pageViewName = document.body.getAttribute('data-pageViewName');

  if (pageViewName) {
    // The pageViewName class gets loaded from the globally-defined class
    // This is a PHP-ish approach to OO, and classes themselves (not their
    // objects) are the only things that should be declared globally.
    try {
      // FIXME: I'm not in-love with such a heavy jQuery reliance
      new window[pageViewName]($(document.body))
    } catch(e) {
      console.log('Error instantiating page view ' + pageViewName + ': ' + e);
    }
  } else {
    console.log('No page view defined.');
  }

});
