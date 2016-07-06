/* global React */
import { getThemeName, getThemeIcon } from 'janeswalk/utils/lookups/Theme.js';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const { createElement: ce, Component } = React;

let dtfDate;
// Date formatter
if (typeof(Intl) === 'object') {
  dtfDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}

const getFullName = v => `${v['name-first']} ${v['name-last']}`.trim();

export default class Card extends Component {
  constructor(props) {
    let formatter;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    super(props);

    // Format the start date upfront, since that's expensive
    if (dtfDate) {
      formatter = slot => dtfDate.format(slot[0] * 1000);
    } else {
      formatter = slot => {
        const date = new Date(slot[0] * 1000);
        const dateString = date.toUTCString();
        return dateString.slice(0, dateString.indexOf(' GMT'));
      };
    }

    Object.assign(this, {
      state: {
        startTime: formatter(props.slot),
        past: (props.slot[0] * 1000) < yesterday.getTime(),
      },
    });
  }

  render() {
    let Meeting;
    let LedBy;
    let Thumb;
    let Status;
    const { walk: { id, title, url, thumbnails = [], map, shortDescription, checkboxes, team } } = this.props;
    const { past, startTime } = this.state;
    const placeholder = `placeholder${id % 3}`;
    const leaders = team.filter(member => (member.role === 'walk-leader' || member.type === 'leader'));
    const Tags = Object.keys(checkboxes)
    .filter(check => (check.indexOf('theme-') === 0 && checkboxes[check]))
    .map(theme => (
      ce('li', { className: 'tag', title: getThemeName(theme) },
        ce('i', { className: `fa ${getThemeIcon(theme)}` }),
      )
    ));

    // Build the optional elements
    if (thumbnails.length) {
      Thumb = thumbnails[0].url;
    }

    /* We show the meeting place title if set, but if not show the description. Some leave the title empty. */
    if (map && map.markers && map.markers.length) {
      Meeting = map.markers[0].title || map.markers[0].description;
    }

    if (leaders.length) {
      LedBy = ce('span', null, t`Walk led by ${leaders.map(getFullName).join(', ')}`);
    }

    if (past) {
      Status = ce('div', { className: 'statusMessage' }, 'Ended');
    }

    return (
      ce('div', { className: 'walk-card' },
        ce('a', { href: url },
          ce('div', { className: 'thumbnail' },
            ce('div', { className: `walkimage ${placeholder}`, style: { backgroundImage: `url(${Thumb})` } }, Status),
            ce('div', { className: 'caption' },
              ce('h4', null, title || ''),
              ce('p', null, (shortDescription || '').slice(0, 140)),
            ),
            ce('ul', { className: 'when' },
              ce('li', null, startTime),
              Meeting ? ce('li', null, t`Meet at ${Meeting}`) : null,
              LedBy ? ce('li', null, LedBy) : null,
            ),
            ce('ul', { className: 'list-inline tags' }, Tags),
          ),
        ),
      )
    );
  }
}
