import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { PropTypes, createElement as ce } from 'react';

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

WalkParking.propTypes = {
  accessibleParking: PropTypes.string.isRequired,
};

export default WalkParking;
