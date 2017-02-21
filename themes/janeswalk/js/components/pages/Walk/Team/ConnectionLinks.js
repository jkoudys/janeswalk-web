import { createElement as ce } from 'react';

const connectTypes = require('../../../../json/ConnectionTypes.json');

const ConnectionLinks = ({ name: memberName, connections }) => (
  ce('div', { className: 'btn-toolbar' },
    connectTypes
    .filter(c => connections[c.name])
    .map(({ prefix, match, name, style }, i) => (
      ce('a', {
        key: `connect${name}${i}`,
        className: 'btn',
        href: `${memberName.match(match) ? '' : prefix}${memberName}`,
        target: '_blank',
      },
        ce('i', { className: style }),
      )
    )
  ))
);

export default ConnectionLinks;
