import React from 'react';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const WalkRoute = ({ markers }) => (
  <section className="walkRoute">
    <a name="Walk Route"></a>
    <h2>{t`Walk Route`}</h2>
    <ol>
      {markers.map(({ properties: { title, description } }, i) => (
        <li key={`routeentry${i}`}>
          <h2>{title}</h2>
          <p>{description}</p>
        </li>
      ))}
    </ol>
  </section>
);

export default WalkRoute;
