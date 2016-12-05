import { translateTag as t } from 'janeswalk/stores/I18nStore';
import React from 'react';

const WalkParking = ({ accessibleParking = [], style }) => {
  if (accessibleParking.length) {
    return (
      <section className={`walkParking ${style}`}>
        {style === 'walk-page' ? <a name="Parking Availability" /> : null}
        <a name="Parking Availability"></a>
        <h2>{t`Parking Availability`}</h2>
        {accessibleParking}
      </section>
    );
  }
  return <section />;
};

WalkParking.propTypes = {
  accessibleParking: React.PropTypes.string.isRequired,
};

export default WalkParking;
