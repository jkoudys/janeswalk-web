/**
 * A set of walk filters, to filter on properties. Also includes
 * the tabs, like 'list' and 'map/
 */
/* global React ReactDOM JanesWalk */

import WalkFilter from './WalkFilter.jsx';

// Fluxxy
import * as WalkActions from 'janeswalk/actions/WalkActions';
import * as CityActions from 'janeswalk/actions/CityActions';

let _filters = {};

JanesWalk.event.on('walkfilters.load', (location) => ReactDOM.render(
  <WalkFilter filters={_filters} {...{ location }} />,
  document.getElementById('janeswalk-walk-filters')
));

// Listen for updates, add routing
JanesWalk.event.on('filters.receive', filters => { _filters = filters; });
JanesWalk.event.on('city.receive', city => CityActions.receive(city));
JanesWalk.event.on('walks.receive', walks => WalkActions.receiveAll(walks));
