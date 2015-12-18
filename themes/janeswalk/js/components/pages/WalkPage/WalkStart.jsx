import React from 'react';

const WalkStart = ({accessibleFind}) => (
  <section id="walkStart">
    <a name="How to find us"></a>
    <h2>How to Find Us</h2>
    {accessibleFind}
  </section>
);

WalkStart.propTypes = {
  accessibleFind: React.PropTypes.string.isRequired,
};

export default WalkStart;
