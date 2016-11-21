import React from 'react';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const WalkRoute = ({ map }) => (
  <section className="walkRoute">
    <a name="Walk Route"></a>
    <h2>{t`Walk Route`}</h2>
    <ol>
      {map.markers.map(({ title, description }, i) => (
        <li key={`routeentry${i}`}>
          <h2>{title}</h2>
          <p>{description}</p>
        </li>
      ))}
    </ol>
  </section>
);

WalkRoute.propTypes = {
  map: React.PropTypes.object.isRequired,
};

export default WalkRoute;
