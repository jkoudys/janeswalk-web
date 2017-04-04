import { createElement as ce } from 'react';

const connectTypes = [{
  name: 'twitter',
  prefix: 'http://twitter.com/',
  match: '^(https?://(www.)?twitter.com|@)?(.*)$',
  style: 'fa fa-twitter',
}, {
  name: 'facebook',
  prefix: 'http://facebook.com/',
  match: '^(https?://)?((www.)?(facebook.com)/?)?(.*)$',
  style: 'fa fa-facebook',
}, {
  name: 'email',
  prefix: 'mailto:',
  match: '(mailto:)?(.*)$',
  style: 'fa fa-envelope-o',
}, {
  name: 'website',
  prefix: '//',
  match: '^(https?://)?(.*)$',
  style: 'fa fa-globe',
}];

function getLink({ connections, match, name, prefix }) {
  const matches = (connections[name] || '').match(match);
  if (matches) {
    const unprefix = matches[matches.length - 1];
    return `${prefix}${unprefix}`;
  }
  return '';
}

const ConnectionLinks = ({ name: memberName, connections }) => (
  ce('div', { className: 'btn-toolbar' },
    connectTypes
    .filter(c => connections[c.name])
    .map(({ prefix, match, name, style }, i) => (
      ce('a', {
        key: `connect${name}${i}`,
        className: 'btn',
        href: getLink({ connections, name, prefix, match }),
        target: '_blank',
      },
        ce('i', { className: style }),
      )
    )
  ))
);

export default ConnectionLinks;
