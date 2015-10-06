/**
 * A set of walk filters, to filter on properties. Also includes
 * the tabs, like 'list' and 'map/
 */

import CityMap from './CityMap.jsx';
import WalkFilter from './WalkFilter.jsx';

let _walks;
let _city;

JanesWalk.event.on('walks.receive', function(walks, props) {
  _walks = walks;
  React.render(
    <WalkFilter walks={walks} filters={props.filters} city={_city} />,
    document.getElementById('janeswalk-walk-filters')
  );
});

JanesWalk.event.on('city.receive', city => { _city = city });

document.addEventListener('DOMContentLoaded', function() {
  // We should have the city in the footer at this point. Eventually this
  // footer city should be completely replaced with events
  JanesWalk.event.emit('city.receive', JanesWalk.city);

  // Setup the walk map
 /*
  React.render(
    <CityMap walks={JanesWalk.walks} city={JanesWalk.city} />,
    document.getElementById('jw-map')
  ); */

});
