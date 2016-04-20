/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const WalkDescription = ({ longDescription = '' }) => (
  <section className="walkDescription">
    <a name="About This Walk" />
    <h2>
      <span clasName="topRule">
        {t`About This Walk`}
      </span>
    </h2>
    <article dangerouslySetInnerHTML={{ __html: longDescription }} />
  </section>
);

WalkDescription.propTypes = {
  longDescription: React.PropTypes.string.isRequired,
};

export default WalkDescription;
