import { PropTypes, createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

const WalkStart = ({ accessibleFind }) => (
  ce('section', { className: 'walkStart' },
    ce('a', { name: 'How to find us' }),
    ce('h2', {}, t`How to find us`),
    accessibleFind,
  )
);

WalkStart.propTypes = {
  accessibleFind: PropTypes.string.isRequired,
};

export default WalkStart;
