import { createElement as ce } from 'react';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

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
