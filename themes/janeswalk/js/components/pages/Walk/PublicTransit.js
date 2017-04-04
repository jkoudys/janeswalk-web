import { createElement as ce  } from 'react';
import t from 'es2015-i18n-tag';

const WalkPublicTransit = ({ accessibleTransit = [] }) => {
  if (accessibleTransit.length) {
    return (
      ce('section', { className: 'walkPublicTransit' },
        ce('a', { name: 'Taking Public Transit' }),
        ce('h2', {}, t`Taking Public Transit`),
        accessibleTransit,
      )
    );
  }
  return ce('section');
};

export default WalkPublicTransit;
