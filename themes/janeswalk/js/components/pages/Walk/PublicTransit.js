import { createElement as ce, PropTypes } from 'react';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

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

WalkPublicTransit.propTypes = {
  accessibleTransit: PropTypes.string.isRequired,
};

export default WalkPublicTransit;
