/**
 * Initialization code goes here. This is not to be a dumping ground for
 * miscellaneous functions, and especially not a place to stick new global
 * variables.
 */
// Translations for i18n L10n
import * as I18nUtils from 'janeswalk/utils/I18nUtils.js';
import * as AreaActions from './actions/AreaActions.js';
import * as UserActions from './actions/UserActions.js';
import Navbar from './components/Navbar.jsx';

// Page Views
import Page from './components/Page.jsx';
import City from './components/pages/City.jsx';
import Home from './components/pages/Home.jsx';
import Profile from './components/pages/Profile.jsx';
const PageViews = {
  PageView: Page,
  CityPageView: City,
  HomePageView: Home,
  ProfilePageView: Profile,
};

// React Views
import CreateWalk from './components/CreateWalk.jsx';
import Walk from './components/pages/Walk.jsx';
const ReactViews = {
  CreateWalkView: CreateWalk,
  WalkPageView: Walk
};
// load modals
import Login from './components/Login.jsx';

// Shims
// Used for Intl.DateTimeFormat
if (!window.Intl) {
  window.Intl = require('intl/Intl.en');
}

/**
 * Let hitting 'm' make the menu pop up
 */
function initKeyEvents() {
  // Init keyboard shortcuts
  let toolbar = document.getElementById('ccm-toolbar');
  if (toolbar) {
    window.addEventListener('keyup', ev => {
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
            if (toolbar.style.display === 'block' || !toolbar.style.display) {
              toolbar.style.display = 'none';
            } else {
              toolbar.style.display = 'block';
            }
            break;
          default:
            break;
        }
      }
    });
  }
}

/**
 * Route the JSX view, for either an old v1 page, or a React component
 */
function routePage() {
  const pageViewName =
    document.body.getAttribute('data-pageViewName') ||
    'PageView';
  const ReactView = ReactViews[pageViewName];

  // Render our header first
  const navbar = document.getElementById('navbar');
  if (navbar) {
    React.render(<Navbar />, navbar);
  }

  try {
    // Render modals we need on each page
    const loginEl = <Login socialLogin={(JanesWalk.stacks || {"Social Logins": ""})['Social Logins']} />;

    // FIXME: once site's all-react, move this out of the JanesWalk object. Don't follow this approach
    // or we'll end up with massive spaghetti.
    window.JanesWalk.react = {login: loginEl};

    React.render(
      loginEl,
      document.getElementById('modals')
    );

    // Load our translations upfront
    I18nUtils.getTranslations(JanesWalk.locale);

    // Hybrid-routing. First check if there's a React view (which will render
    // nearly all the DOM), or a POJO view (which manipulates PHP-built HTML)
    if (ReactView) {
      switch (pageViewName) {
        case 'CreateWalkView':
          React.render(
            <ReactView
              data={JanesWalk.walk.data}
              city={JanesWalk.city}
              user={JanesWalk.user}
              url={JanesWalk.walk.url}
              valt={JanesWalk.form.valt}
            />,
            document.getElementById('createwalk')
        );
        break;
        default:
          // TODO: use JanesWalk.event to supply these data, not a global obj
          React.render(
            <ReactView {...JanesWalk} />,
            document.getElementById('page')
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
}

document.addEventListener('DOMContentLoaded', function() {
  JanesWalk.event.on('area.receive', areas => AreaActions.receive(areas));
  JanesWalk.event.on('user.receive', user => UserActions.receive(user));

  // Process all deferred events
  JanesWalk.event.activate();

  // TODO: emit the city without needing to load JanesWalk with static data
  JanesWalk.event.emit('city.receive', JanesWalk.city);
  routePage();
  initKeyEvents();
});
