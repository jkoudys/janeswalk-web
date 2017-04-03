import { PropTypes, createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

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
