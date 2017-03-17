import { PropTypes, createElement as ce } from 'react';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const WalkDescription = ({ longDescription = '' }) => (
  ce('section', { className: 'walkDescription' },
    ce('a', { name: 'About This Walk' }),
    ce('h2', {},
      ce('span', { className: 'topRule' }, t`About This Walk`),
    ),
    ce('article', { dangerouslySetInnerHTML: { __html: longDescription } }),
  )
);

WalkDescription.propTypes = {
  longDescription: PropTypes.string.isRequired,
};

export default WalkDescription;
