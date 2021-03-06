/* global JanesWalk */

/**
 * Initialization code goes here. This is not to be a dumping ground for
 * miscellaneous functions, and especially not a place to stick new global
 * variables.
 */
import { createElement as ce } from 'react';
import ReactDOM from 'react-dom';

// Translations for i18n L10n
import { getTranslations } from 'janeswalk/utils/I18nUtils';
import * as AreaActions from 'janeswalk/actions/AreaActions';
import * as UserActions from 'janeswalk/actions/UserActions';
import * as WalkActions from 'janeswalk/actions/WalkActions';
import * as CityActions from 'janeswalk/actions/CityActions';
import * as ItineraryActions from 'janeswalk/actions/ItineraryActions';
import { receiveWalk as receiveWalkForBuilder } from 'janeswalk/actions/WalkBuilderActions';

// Stores, for late-binding some page updates.
// Not fully React, but we can use Flux for making PHP-rendered page updates too!
import CityStore from 'janeswalk/stores/CityStore';

import * as ItineraryAPI from 'janeswalk/utils/api/Itinerary';
import * as WalkBuilderAPI from 'janeswalk/utils/api/WalkBuilder';

// React Views
import Navbar from './components/Navbar.jsx';
import WalkBuilder from './components/WalkBuilder';
import Walk from './components/pages/Walk';
import Dashboard from './components/pages/Dashboard';

// load modals
import Login from './components/Login.jsx';

import initKeyEvents from './helpers/keyevents';

import { LocaleProvider } from 'antd';
import locale from 'antd/lib/locale-provider/en_US';

const { startups, event } = window.JanesWalk;

// Use the main sitewide theme. TODO: componetize this as we go, and drop LESS for css (via cssnext)
require('antd/dist/antd.css');
require('../css/main.less');

// Render the sitewide elements
function renderGlobal() {
  const { stacks: { 'Social Logins': socialLogin = '' } = {} } = JanesWalk;
  // Render our header first
  const navbar = document.getElementById('navbar');
  if (navbar) {
    ReactDOM.render(ce(Navbar), navbar);
  }

  // Render modals we need on each page
  ReactDOM.render(
    ce(Login, { socialLogin }),
    document.getElementById('modals')
  );
}

// Listen for JW events to load flux stores with
function addFluxListeners() {
  event.on('area.receive', areas => AreaActions.receive(areas));
  event.on('user.receive', (user, options) => UserActions.receive(user, options));
  event.on('users.receive', users => UserActions.receiveAll(users));
  event.on('walk.receive', walk => WalkActions.receive(walk));
  event.on('walks.receive', walks => WalkActions.receiveAll(walks));
  event.on('city.receive', city => CityActions.receive(city));
  event.on('itineraries.receive', itineraries => ItineraryActions.receiveAll(itineraries));
}

// Routes initialized by events
function addRenderListeners() {
  // A walk, e.g. /canada/toronto/curb-cuts-and-desire-lines
  event.on('walkpage.load', ({ walk, city, canEdit }) => {
    WalkActions.receive(walk);
    ReactDOM.render(
      ce(LocaleProvider, { locale }, ce(Walk, { city, page: JanesWalk.page, walk, canEdit })),
      document.getElementById('page')
    );
  });

  // The profile page, e.g. /profile
  event.on('profilepage.load', props => {
    ReactDOM.render(
      ce(Dashboard, props),
      document.getElementById('page')
    );
  });

  // Create a walk
  event.on('caw.load', () => {
    const { walk: { data: walk, data: { url } }, form: { valt }, city, user } = JanesWalk;

    receiveWalkForBuilder(walk);

    // Start polling to auto-save
    WalkBuilderAPI.startPolling();

    ReactDOM.render(
       ce(LocaleProvider, { locale }, ce(WalkBuilder, { url, valt, city, user })),
       document.getElementById('page')
    );
  });
}

CityStore.addChangeListener(() => {
  const { pageviewname } = document.body.dataset;

  // Bind anything to render not using react
  if (pageviewname === 'CityPageView') {
    const city = CityStore.getCity();
    if (city) {
      const bgUri = `url(${city.background})`;
      if (city.background && document.body.style.backgroundImage !== bgUri) {
        document.body.style.backgroundImage = bgUri;
      }
    }
  }
});

Promise.all(Object.values(startups)).then(() => {
  const { locale: { name: chosenLocale, translation: localeUrl } = {} } = JanesWalk;

  // Load our translations upfront
  if (chosenLocale && localeUrl) {
    getTranslations({ locale: chosenLocale, url: localeUrl })
    .then(() => CityStore.emitChange());
  }

  renderGlobal();
  addFluxListeners();
  addRenderListeners();

  initKeyEvents();

  // TODO: this could use a better home
  setTimeout(() => ItineraryAPI.startPolling(), 1000);

  // Process all deferred events
  event.activate();
});
