import t from 'es2015-i18n-tag';
import { createElement as ce } from 'react';

const WalkParking = ({ accessibleParking = [], style }) => {
  if (accessibleParking.length) {
    return (
      ce('section', { className: `walkParking ${style}` },
        style === 'walk-page' ? ce('a', { name: 'Parking Availability' }) : null,
        ce('a', { name: 'Parking Availability' }),
        ce('h2', {}, t`Parking Availability`),
        accessibleParking,
      )
    );
  }
  return ce('section');
};

export default WalkParking;
