/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const WalkPublicTransit = ({ accessibleTransit = [] }) => {
  if (accessibleTransit.length) {
    return (
      <section className="walkPublicTransit">
        <a name="Taking Public Transit" />
        <h2>{t`Taking Public Transit`}</h2>
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
