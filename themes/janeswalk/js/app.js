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

  // Init keyboard shortcuts
  var toolbar = document.getElementById('ccm-toolbar');
  if (toolbar) {
    window.addEventListener("keyup", function(ev) {
      /* Don't capture inputs going into a form */
      if(ev.target.tagName !== "INPUT") {
        ev.preventDefault();
        switch(String(ev.key || (ev.keyCode && String.fromCharCode(ev.keyCode)) || ev.char).toUpperCase()) {
          case "M":
            if (toolbar.style) {
              if (toolbar.style.zIndex == 99999) {
                toolbar.style.zIndex = -1;
              } else {
                toolbar.style.zIndex = 99999;
              }
            }
            break;
          default:
            break;
        }
      }
    });
  }

});
