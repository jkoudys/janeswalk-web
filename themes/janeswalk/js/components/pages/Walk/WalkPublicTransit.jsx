/* global React */

const WalkPublicTransit = ({ accessibleTransit = [] }) => {
  if (accessibleTransit.length) {
    return (
      <section className="walkPublicTransit">
        <a name="Taking Public Transit" />
        <h2>Taking Public Transit</h2>
        {accessibleTransit}
      </section>
    );
  }
  return <section />;
};

WalkPublicTransit.propTypes = {
  accessibleTransit: React.PropTypes.string.isRequired,
};

export default WalkPublicTransit;
