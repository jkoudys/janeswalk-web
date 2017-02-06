/**
 * A set of walk filters, to filter on properties. Also includes
 * the tabs, like 'list' and 'map/
 */
/* global JanesWalk */
import { createElement as ce } from 'react';
import { render } from 'react-dom';

// Fluxxy
import * as WalkActions from 'janeswalk/actions/WalkActions';
import * as CityActions from 'janeswalk/actions/CityActions';

import WalkFilter from './WalkFilter';

const { event } = JanesWalk;

let _filters = {};

event.on('walkfilters.load', (location) => render(
  ce(WalkFilter, { filters: _filters, location }),
  document.getElementById('janeswalk-walk-filters')
));

// Listen for updates, add routing
event.on('filters.receive', filters => { _filters = filters; });
event.on('city.receive', city => CityActions.receive(city));
event.on('walks.receive', walks => WalkActions.receiveAll(walks));
