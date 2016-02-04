/**
 * The cards showing your walk
 */
import {getThemeName, getThemeIcon} from 'janeswalk/utils/lookups/Theme.js';

const t = s => s;

let dtfDate;
// Date formatter
if (typeof(Intl) === 'object') {
  dtfDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC'
  });
}

export default class WalkCards extends React.Component {
  render() {
    if (this.props.walks.length === 0) {
      return (
        <div className="empty">
          <h4>{t('Keep looking.')}</h4>
          <p>{t('We couldn\'t find any matching walks.')}</p>
        </div>
      );
    } else {
      return <div className="walkCards">
        {this.props.walks.map(walk => <Card walk={walk} />)}
      </div>;
    }
  }
}

class Card extends React.Component {
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

    this.state = {
      startTimes: props.walk.time.slots.map(formatter),
      past: past
    };
  }

  render() {
    let Meeting;
    let LedBy;
    let Thumb;
    let Status;
    const walk = this.props.walk;
    const placeholder = 'placeholder' + (walk.id % 3);
    const leaders = walk.team.filter(member => (member.role === 'walk-leader' || member.type === 'leader'));
    const Tags = Object.keys(walk.checkboxes).filter(check => (check.indexOf('theme-') === 0 && walk.checkboxes[check])).map(
      theme => <li className="tag" data-toggle="tooltip" data-theme={theme} title={getThemeName(theme)}><i className={'fa ' + getThemeIcon(theme)} /></li>
    );

    // Build the optional elements
    if (walk.thumbnails.length) {
        Thumb = walk.thumbnails[0].url;
    }

    /* We show the meeting place title if set, but if not show the description. Some leave the title empty. */
    if (walk.map && walk.map.markers && walk.map.markers.length) {
      Meeting = walk.map.markers[0].title || walk.map.markers[0].description;
    }

    if (leaders.length) {
      LedBy = <span>{'Walk led by ' + leaders.map(v => v['name-first'] + ' ' + v['name-last']).join(', ')}</span>;
    }

    if (this.state.past) {
      Status = <div className="statusMessage">Ended</div>;
    }

    return (
      <div className="walk-card">
      <a href={walk.url}>
        <div className="thumbnail">
          <div className={'walkimage ' + placeholder} style={{backgroundImage: 'url(' + Thumb + ')'}}>
            {Status}
          </div>
          <div className="caption">   
            <h4>{(walk.title || '').slice(0, 45)}</h4>
            <p>{(walk.shortDescription || '').slice(0, 140)}</p>      
          </div>
          <ul className="when">
              {this.state.startTimes.map(startTime => <li>{startTime}</li>)}
              <li>Meet at {Meeting}</li>
              <li>{LedBy}</li>
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
