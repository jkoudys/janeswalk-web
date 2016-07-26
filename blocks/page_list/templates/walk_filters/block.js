/**
 * A set of walk filters, to filter on properties. Also includes
 * the tabs, like 'list' and 'map/
 */
/* global React ReactDOM JanesWalk */

import WalkFilter from './WalkFilter';

// Fluxxy
import * as WalkActions from 'janeswalk/actions/WalkActions';
import * as CityActions from 'janeswalk/actions/CityActions';

const { createElement: ce } = React;
const { event } = JanesWalk;

let _filters = {};

event.on('walkfilters.load', (location) => ReactDOM.render(
  ce(WalkFilter, { filters: _filters, location }),
  document.getElementById('janeswalk-walk-filters')
));

// Listen for updates, add routing
event.on('filters.receive', filters => { _filters = filters; });
event.on('city.receive', city => CityActions.receive(city));
event.on('walks.receive', walks => WalkActions.receiveAll(walks));
