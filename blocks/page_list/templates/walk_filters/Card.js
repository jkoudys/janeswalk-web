/* global React */
import { getThemeName, getThemeIcon } from 'janeswalk/utils/lookups/Theme.js';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const { createElement: ce } = React;

let dtfDate;
// Date formatter
if (typeof Intl === 'object') {
  dtfDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const times = {};
const formatter = (startTime) => {
  if (dtfDate) {
    times[startTime] = dtfDate.format(startTime * 1000);
  } else {
    times[startTime] = (new Date(startTime * 1000))
    .toUTCString()
    .slice(0, -4);
  }

  return times[startTime];
};

const Card = ({
  walk: {
    id = -1,
    title = '',
    url = '',
    thumbnails: [{ url: thumbUrl } = {}] = [],
    features: [{
      properties: {
        title: meetingTitle,
        description: meetingDescription,
      } = {},
    } = {}] = [],
    shortDescription = '',
    themes = [],
    team = [],
    time: {
      slots: [[startTime] = []] = [],
    } = {},
  },
}) => {
  const past = startTime * 1000 < yesterday.getTime();
  const placeholder = `placeholder${id % 3}`;
  const thumbStyle = {};
  const meeting = meetingTitle || meetingDescription;
  const ledBy = team
  .filter(({ type }) => type === 'leader')
  .map(({ name }) => name)
  .join(', ');

  const Tags = themes.map(theme => (
    ce('li', { className: 'tag', key: `tag${theme}`, title: getThemeName(theme) },
       ce('i', { className: `fa ${getThemeIcon(theme)}` }),
      )
  ));

  // Build the optional elements
  if (thumbUrl) {
    thumbStyle.backgroundImage = `url(${thumbUrl})`;
  }

  return (
    ce('div', { className: 'walk-card' },
      ce('a', { href: url },
        ce('div', { className: 'thumbnail' },
          ce('div', { className: `walkimage ${placeholder}`, style: thumbStyle },
            past ? ce('div', { className: 'statusMessage' }, t`Ended`) : null,
          ),
          ce('div', { className: 'caption' },
            ce('h4', null, title || ''),
            ce('p', null, (shortDescription || '').slice(0, 140)),
          ),
          ce('ul', { className: 'when' },
            ce('li', null, formatter(startTime)),
            meeting ? ce('li', null, t`Meet at ${meeting}`) : null,
            ledBy ? ce('li', null, ce('span', null, t`Walk led by ${ledBy}`)) : null,
          ),
          ce('ul', { className: 'list-inline tags' }, Tags),
        ),
      ),
    )
  );
};

export default Card;
