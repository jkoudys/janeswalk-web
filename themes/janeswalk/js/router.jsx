/**
 * Initialization code goes here. This is not to be a dumping ground for
 * miscellaneous functions, and especially not a place to stick new global
 * variables.
 */
// Translations for i18n L10n
import {getTranslations} from 'janeswalk/utils/I18nUtils';
import * as AreaActions from 'janeswalk/actions/AreaActions';
import * as UserActions from 'janeswalk/actions/UserActions';
import * as WalkActions from 'janeswalk/actions/WalkActions';
import * as ItineraryActions from 'janeswalk/actions/ItineraryActions';
import Navbar from './components/Navbar.jsx';

import * as ItineraryAPI from 'janeswalk/utils/api/Itinerary';

// React Views
import CreateWalk from './components/CreateWalk.jsx';
import Walk from './components/pages/Walk.jsx';

import Dashboard from './components/pages/Dashboard.jsx';

// load modals
import Login from './components/Login.jsx';

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

function renderGlobal() {
  // Render our header first
  const navbar = document.getElementById('navbar');
  if (navbar) {
    React.render(<Navbar />, navbar);
  }

  // Render modals we need on each page
  React.render(
    <Login socialLogin={(JanesWalk.stacks || {"Social Logins": ""})['Social Logins']} />,
    document.getElementById('modals')
  );
}

// Listen for JW events to load flux stores with
function addFluxListeners() {
  JanesWalk.event.on('area.receive', areas => AreaActions.receive(areas));
  JanesWalk.event.on('user.receive', (user, options) => UserActions.receive(user, options));
  JanesWalk.event.on('users.receive', users => UserActions.receiveAll(users));
  JanesWalk.event.on('walk.receive', walk => WalkActions.receive(walk));
  JanesWalk.event.on('walks.receive', walks => WalkActions.receiveAll(walks));
  JanesWalk.event.on('itineraries.receive', itineraries => ItineraryActions.receiveAll(itineraries));
}

// Routes initialized by events
function addRenderListeners() {
  // A walk, e.g. /canada/toronto/curb-cuts-and-desire-lines
  JanesWalk.event.on('walkpage.load', ({walk, city}) => {
    WalkActions.receive(walk);
    React.render(
      <Walk city={city} page={JanesWalk.page} walk={walk} />,
      document.getElementById('page')
    ); 
  });

  // The profile page, e.g. /profile
  JanesWalk.event.on('profilepage.load', props => {
    React.render(
      <Dashboard {...props} />,
      document.getElementById('page')
    );
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Load our translations upfront
  getTranslations(JanesWalk.locale);

  renderGlobal();
  addFluxListeners();
  addRenderListeners();

  initKeyEvents();

  // TODO: emit the city without needing to load JanesWalk with static data
  JanesWalk.event.emit('city.receive', JanesWalk.city);

  // TODO: this could use a better home
  ItineraryAPI.startPolling();

  // Process all deferred events
  JanesWalk.event.activate();
});
