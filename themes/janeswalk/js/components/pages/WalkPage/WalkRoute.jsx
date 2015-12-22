import React from 'react';

const WalkRoute = ({map}) => (
  <section className="walkRoute">
    <a name="Walk Route"></a>
    <h2>Walk Route</h2>
    <ol>
      {map.markers.map((marker,i) => <li key={i}>{marker.title}</li>)}
    </ol>
  </section>
);

WalkRoute.propTypes = {
  map: React.PropTypes.object.isRequired,
};

export default WalkRoute;
