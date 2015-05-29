'use strict';

/**
 * Initialization code goes here. This is not to be a dumping ground for
 * miscellaneous functions, and especially not a place to stick new global
 * variables.
 */

// Page Views
var PageViews = {
  PageView: require('./components/Page.jsx'),
  CityPageView: require('./components/pages/City.jsx'),
  HomePageView: require('./components/pages/Home.jsx'),
  ProfilePageView: require('./components/pages/Profile.jsx'),
  WalkPageView: require('./components/pages/Walk.jsx')
};
var ReactViews = {
  CreateWalkView: require('./components/CreateWalk.jsx')
};
// load modals
var Login = require('./components/Login.jsx')

// Shims
// Used for Intl.DateTimeFormat
if (!window.Intl) {
  window.Intl = require('intl/Intl.en');
}

document.addEventListener('DOMContentLoaded', function() {
  var pageViewName =
    document.body.getAttribute('data-pageViewName') ||
    'PageView';
  var ReactView = ReactViews[pageViewName];

  try {
    // Render modals we need on each page
    var loginEl = <Login socialLogin={(JanesWalk.stacks || {"Social Logins": ""})['Social Logins']} />;

    // FIXME: once site's all-react, move this out of the JanesWalk object. Don't follow this approach
    // or we'll end up with massive spaghetti.
    JanesWalk.react = {
      login: loginEl
    };
    React.render(
      loginEl,
      document.getElementById('modals')
    );

    // Hybrid-routing. First check if there's a React view (which will render
    // nearly all the DOM), or a POJO view (which manipulates PHP-built HTML)
    if (ReactView) {
      switch (pageViewName) {
        case 'CreateWalkView':
          React.render(
            <ReactView
              locale={JanesWalk.locale}
              data={JanesWalk.walk.data}
              city={JanesWalk.city}
              user={JanesWalk.user}
              url={JanesWalk.walk.url}
              valt={JanesWalk.form.valt}
            />,
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
});
