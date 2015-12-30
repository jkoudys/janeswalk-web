const WalkPublicTransit = ({accessibleTransit, style}) => (
  <section className={`walkPublicTransit ${style}`}>
    {style === 'walk-page' ? <a name="Taking Public Transit"></a> : ''}
    <h2>Taking Public Transit</h2>
    {accessibleTransit}
  </section>
);

WalkPublicTransit.propTypes = {
  accessibleTransit: React.PropTypes.string.isRequired,
};

export default WalkPublicTransit;
