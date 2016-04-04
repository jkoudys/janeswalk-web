/* global React */

const WalkStart = ({ accessibleFind }) => (
  <section className="walkStart">
    <a name="How to find us" />
    <h2>How to Find Us</h2>
    {accessibleFind}
  </section>
);

WalkStart.propTypes = {
  accessibleFind: React.PropTypes.string.isRequired,
};

export default WalkStart;
