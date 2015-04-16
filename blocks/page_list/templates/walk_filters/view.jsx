/**
 * A set of walk filters, to filter on properties. Also includes
 * the tabs, like 'list' and 'map/
 */
'use strict';

var CityMap = require('./CityMap.jsx');
var WalkList = require('./WalkList.jsx');

document.addEventListener('DOMContentLoaded', function(){
  // Setup the walk list
  WalkList.addWalkListEvents();

  // Setup the walk map
  React.render(
    <CityMap walks={JanesWalk.walks} city={JanesWalk.city} />,
    document.getElementById('jw-map')
  );
});
