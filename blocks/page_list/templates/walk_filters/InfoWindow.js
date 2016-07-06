/* global React */
const { createElement: ce } = React;

export default ({ title, url, date, shortDescription, leaders = [] }) => (
  ce('span', null,
    ce('h4', { style: { marginBottom: '0.1em' } }, title),
    date,
    leaders.length ? ce('h6', null, `Led by: ${leaders.join(', ')}`) : null,
    ce('p', null,
      `${shortDescription} `,
      ce('a', { href: url, target: '_blank' }, 'Read More'),
    )
  )
);
