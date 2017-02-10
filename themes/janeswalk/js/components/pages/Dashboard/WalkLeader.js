import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

// TODO: Common component from <Itinerary/> <Walk/>, List component should be generic with configuration specified (maybe a mixing or factory) (Post-PR)
// TODO: Show volunteers - so static data generated is not correct (confirm with json data provided before proceeding with any changes

const timeYears = new Map();
const getYear = (time) => timeYears.get(time) ||
  timeYears.set(time, (new Date(time * 1000)).getFullYear()).get(time);

const WalkLeader = ({ name, walks, email }) => {
  const Walks = walks
  .filter(({ time: [[start] = []] = [] }) => start)
  .map(({ id: key, url, title, time: [[start] = []] = [] }) => (
    ce('li', { key },
      ce('a', { href: url }, title),
      ' (', getYear(start), ')',
    )
  ));

  return (
    ce('li', {},
      ce('div', { className: 'walkLeader' },
        ce('h3', {},
          t`Walk Leader: ${name}`,
          ' ',
          ce('span', { className: 'walkLeaderEmail' },
            ce('a', { href: `mailto:${email}` }, email),
          ),
        ),
        ce('ul', {},
          ce('h4', {}, Walks),
        ),
      ),
    )
  );
};

export default WalkLeader;
