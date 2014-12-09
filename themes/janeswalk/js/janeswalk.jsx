'use strict';

/**
 * Initialization code goes here. This is not to be a dumping ground for
 * miscellaneous functions, and especially not a place to stick new global
 * variables.
 */

// Page Views
var PageViews = {
  PageView: require('./views/Page.jsx'),
  CityPageView: require('./views/pages/City.jsx'),
  HomePageView: require('./views/pages/Home.jsx'),
  ProfilePageView: require('./views/pages/Profile.jsx'),
  WalkPageView: require('./views/pages/Walk.jsx')
};
var ReactViews = {
  CreateWalkView: require('./views/CreateWalk.jsx')
};

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  var pageViewName =
    document.body.getAttribute('data-pageViewName') ||
    'PageView';
  var ReactView = ReactViews[pageViewName];

  try {
    // Hybrid-routing. First check if there's a React view (which will render
    // nearly all the DOM), or a POJO view (which manipulates PHP-built HTML)
    if (ReactView) {
      switch (pageViewName) {
        case 'CreateWalkView':
          React.render(
            <ReactView data={JanesWalk.walk.data} city={JanesWalk.city} user={JanesWalk.user} url={JanesWalk.walk.url} valt={JanesWalk.form.valt} />,
        document.getElementById('createwalk')
        );
        break;
      }
    } else {
      // FIXME: I'm not in-love with such a heavy jQuery reliance
      new PageViews[pageViewName]($(document.body));
    }
  } catch(e) {
    console.error('Error instantiating page view ' + pageViewName + ': ' + e.stack);
  }

  // Init keyboard shortcuts
  var toolbar = document.getElementById('ccm-toolbar');
  if (toolbar) {
    window.addEventListener('keyup', function(ev) {
      /* Don't capture inputs going into a form */
      if(ev.target.tagName !== "INPUT") {
        ev.preventDefault();
        switch(
          String(
            ev.key ||
            (ev.keyCode && String.fromCharCode(ev.keyCode)) ||
            ev.char)
            .toUpperCase()
        ){
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
