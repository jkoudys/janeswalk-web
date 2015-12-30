const WalkParking = ({accessibleParking, style}) => (
    <section className={`walkParking ${style}`}>
     {style === 'walk-page' ? <a name="Parking Availability"></a> : ''}
     <h2>Parking Availability</h2>
     {accessibleParking}
    </section>
);

WalkParking.propTypes = {
 accessibleParking: React.PropTypes.string.isRequired,
};

export default WalkParking;
