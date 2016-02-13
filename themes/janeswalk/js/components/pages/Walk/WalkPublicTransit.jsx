const WalkPublicTransit = ({accessibleTransit}) => {
  if (accessibleTransit && accessibleTransit.length > 0) {
    return (
      <section className="walkPublicTransit">
        <a name="Taking Public Transit"></a>
        <h2>Taking Public Transit</h2>
        {accessibleTransit}
      </section>
    );
  } else {
    return <section />;
  }
};

WalkPublicTransit.propTypes = {
  accessibleTransit: React.PropTypes.string.isRequired,
};

export default WalkPublicTransit;
