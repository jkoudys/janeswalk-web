import React from 'react';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const WalkStart = ({ accessibleFind }) => (
  <section className="walkStart">
    <a name="How to find us" />
    <h2>{t`How to Find Us`}</h2>
    {accessibleFind}
  </section>
);

WalkStart.propTypes = {
  accessibleFind: React.PropTypes.string.isRequired,
};

export default WalkStart;
