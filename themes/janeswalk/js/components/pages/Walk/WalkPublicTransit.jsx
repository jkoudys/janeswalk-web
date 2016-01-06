const WalkPublicTransit = ({accessibleTransit}) => (
  <section className="walkPublicTransit">
    <h2>Taking Public Transit</h2>
    {accessibleTransit}
  </section>
);

WalkPublicTransit.propTypes = {
  accessibleTransit: React.PropTypes.string.isRequired,
};

export default WalkPublicTransit;
