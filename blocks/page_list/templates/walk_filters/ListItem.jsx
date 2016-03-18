/* global React */

export default class ListItem extends React.Component {
  constructor(props) {
    let formatter;
    super(props);

    if (props.walk.time.slots.length) {
      let time = props.walk.time.slots[0][0] * 1000;

      this.state = {
        startDate: dtfDate.format(time),
        startTime: dtfTime.format(time),
      }
    }
  }

  render() {
    let Meeting;
    const { walk: { map, url, title } }  = this.props;
    const { startDate, startTime } = this.state;

    /* We show the meeting place title if set, but if not show the description. Some leave the title empty. */
    if (map && map.markers && map.markers.length) {
      Meeting = map.markers[0].title || map.markers[0].description;
    }

    return (
      <tr>
        <td>{startDate}</td>
        <td>{startTime}</td>
        <td><a href={url} target="_blank" >{title}</a></td>
        <td>{Meeting}</td>
      </tr>
    );
  }
}
