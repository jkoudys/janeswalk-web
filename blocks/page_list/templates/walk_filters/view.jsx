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


JanesWalk.event.on('city.receive', function(city) {
  _city = city;
});
