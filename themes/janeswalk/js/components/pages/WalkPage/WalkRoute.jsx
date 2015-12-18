import React from 'react';

const WalkRoute = ({map}) => (
  <section id="walkRoute">
    <a name="Walk Route"></a>
    <h2>Walk Route</h2>
    <ol>
      {map.markers.map(marker => <li>{marker.title}</li>)}
    </ol>
  </section>
);

WalkRoute.propTypes = {
  map: React.PropTypes.object.isRequired,
};

export default WalkRoute;