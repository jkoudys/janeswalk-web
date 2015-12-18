import React from 'react';

const WalkPublicTransit = ({accessibleTransit}) => (
  <section id="walkPublicTransit">
    <a name="Taking Public Transit"></a>
    <h2>Public Transit</h2>
    {accessibleTransit}
  </section>
);

WalkPublicTransit.propTypes = {
  accessibleTransit: React.PropTypes.string.isRequired,
};

export default WalkPublicTransit;