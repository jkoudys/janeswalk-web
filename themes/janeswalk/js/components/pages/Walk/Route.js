import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

const WalkRoute = ({ markers }) => (
  ce('section', { className: 'walkRoute' },
    ce('a', { name: 'Walk Route' }),
    ce('h2', {}, t`Walk Route`),
    ce('ol', {}, markers.map(({ properties: { title, description } }, i) => (
      ce('li', { key: `routeentry${i}` },
        ce('h2', {}, title),
        ce('p', {}, description),
      )
    ))),
  )
);

export default WalkRoute;
