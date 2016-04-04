/* global React */
import { getThemeName, getThemeIcon } from 'janeswalk/utils/lookups/Theme.js';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

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

export default class Card extends React.Component {
  constructor(props) {
    let formatter;
    let past;
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

    if (props.walk.time.slots.length) {
      past = (props.walk.time.slots[0][0] * 1000) < yesterday.getTime();
    }

    Object.assign(this, {
      state: { startTimes: props.walk.time.slots.map(formatter), past },
    });
  }

  render() {
    let Meeting;
    let LedBy;
    let Thumb;
    let Status;
    const { walk: { id, title, url, thumbnails = [], map, shortDescription, checkboxes, team } } = this.props;
    const { past, startTimes } = this.state;
    const placeholder = `placeholder${id % 3}`;
    const leaders = team.filter(member => (member.role === 'walk-leader' || member.type === 'leader'));
    const Tags = Object.keys(checkboxes)
    .filter(check => (check.indexOf('theme-') === 0 && checkboxes[check]))
    .map(theme => (
      <li className="tag" data-toggle="tooltip" data-theme={theme} title={getThemeName(theme)}>
        <i className={`fa ${getThemeIcon(theme)}`} />
      </li>
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
      LedBy = (
        <span>
          {t`Walk led by ${leaders.map(getFullName).join(', ')}`}
        </span>
      );
    }

    if (past) {
      Status = <div className="statusMessage">Ended</div>;
    }

    return (
      <div className="walk-card">
        <a href={url}>
          <div className="thumbnail">
            <div className={`walkimage ${placeholder}`} style={{ backgroundImage: `url(${Thumb})` }}>
              {Status}
            </div>
            <div className="caption">
              <h4>{(title || '').slice(0, 45)}</h4>
              <p>{(shortDescription || '').slice(0, 140)}</p>
            </div>
            <ul className="when">
              {startTimes.map(startTime => <li>{startTime}</li>)}
              {Meeting ? <li>{t`Meet at ${Meeting}`}</li> : null}
              {LedBy ? <li>{LedBy}</li> : null}
            </ul>
            <ul className="list-inline tags">
              {Tags}
            </ul>
          </div>
        </a>
      </div>
    );
  }
}
