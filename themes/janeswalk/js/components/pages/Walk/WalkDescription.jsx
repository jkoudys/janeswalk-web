/* global React */

const WalkDescription = ({ longDescription = '' }) => (
  <section className="walkDescription">
    <a name="About This Walk" />
    <h2>
      <span clasName="topRule">
        About This Walk
      </span>
    </h2>
    <article dangerouslySetInnerHTML={{ __html: longDescription }} />
  </section>
);

WalkDescription.propTypes = {
  longDescription: React.PropTypes.string.isRequired,
};

export default WalkDescription;
