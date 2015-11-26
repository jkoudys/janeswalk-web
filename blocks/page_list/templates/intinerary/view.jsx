import React from 'react';
import Itinerary from './Itinerary.jsx';

let _itinerary;

JanesWalk.event.on('itinerary.receive', function(itinerary) {
  _itinerary = itinerary;

  React.render(
    <Itinerary itinerary={itinerary}/>,
    document.getElementById('janeswalk-user-itinerary')
  );
});
