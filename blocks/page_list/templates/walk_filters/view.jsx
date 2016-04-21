/**
 * A set of walk filters, to filter on properties. Also includes
 * the tabs, like 'list' and 'map/
 */

import LocationMap from './LocationMap.jsx';
import WalkFilter from './WalkFilter.jsx';

// Fluxxy
import * as WalkActions from 'janeswalk/actions/WalkActions';

let _walks;
let _filters = {};

JanesWalk.event.on('walkfilters.load', function(location) {
  React.render(
    <WalkFilter filters={_filters} {...{location}} />,
    document.getElementById('janeswalk-walk-filters')
  );
});

// Listen for updates, add routing
JanesWalk.event.on('walks.receive', walks => WalkActions.receiveAll(walks));
JanesWalk.event.on('filters.receive', filters => _filters = filters);
