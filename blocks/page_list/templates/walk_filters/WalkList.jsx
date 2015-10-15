/**
 * The list of walks to order
 */

let dtfDate;
let dtfTime;

const t = s => s;

// Date formatter
if (typeof(Intl) === 'object') {
  dtfDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  dtfTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC'
  });
}

export default class WalkList extends React.Component {
  render() {
    const walks = this.props.walks;
    return (
      <table className="walklist table">
        <thead>
          <tr>
            <th>{t('Date')}</th>
            <th>{t('Time')}</th>
            <th>{t('Title')}</th>
            <th>{t('Meeting Place')}</th>
          </tr>
        </thead>
        <tbody>
          {walks.map(walk => <ListItem walk={walk} />)}
        </tbody>
      </table>
    );
  }
}

class ListItem extends React.Component {
  constructor(props) {
    let formatter;
    super(props);

    if (props.walk.time.slots.length) {
      let time = props.walk.time.slots[0][0] * 1000;

      this.state = {
        startDate: dtfDate.format(time),
        startTime: dtfTime.format(time)
      }
    }
  }

  render() {
    let Meeting;
    const walk = this.props.walk;

    /* We show the meeting place title if set, but if not show the description. Some leave the title empty. */
    if (walk.map.markers && walk.map.markers.length) {
      Meeting = walk.map.markers[0].title || walk.map.markers[0].description;
    }

    return (
      <tr>
        <td>{this.state.startDate}</td>
        <td>{this.state.startTime}</td>
        <td><a href={this.props.walk.url} target="_blank" >{this.props.walk.title}</a></td>
        <td>{Meeting}</td>
      </tr>
    );
  }
}
