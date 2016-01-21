/**
 * A set of walk filters, to filter on properties. Also includes
 * the tabs, like 'list' and 'map/
 */

import LocationMap from './LocationMap.jsx';
import WalkFilter from './WalkFilter.jsx';

let _walks;
let _location;

JanesWalk.event.on('walks.receive', function(walks, props) {
  _walks = walks;
  React.render(
    <WalkFilter walks={walks} filters={props.filters} location={_location} />,
    document.getElementById('janeswalk-walk-filters')
  );
});

JanesWalk.event.on('city.receive', city =>  _location = city);
JanesWalk.event.on('country.receive', country => _location = country);
