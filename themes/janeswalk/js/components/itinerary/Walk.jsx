import {dateFormatted, startTimeIndex} from '../../utils/ItineraryUtils';

import AddWalkToList from './AddWalkToList.jsx';

class Walk extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      dialogOpen: false
    };
  }

  componentWillReceiveProps({list}) {
    // If the active list changes, close the dialog
    if (list !== this.props.list) {
      this.setState({dialogOpen: false});
    }
  }

  render() {
    const {walk, list, lists, onAdd, onRemove, startTimes} = this.props;
    const {dialogOpen} = this.state;
    const {title, url, map, time} = walk;
    let startTimesDisplay = [];
    let meeting, start;

    if (map && map.markers[0]) {
      meeting = map.markers[0].title;
    }

    if (time && time.slots) {
      //TODO: Check for the start and end time to match, you cannot use a set
      //start = time.slots[0][0];
      //TODO: Do we want to display time slots for non-itinerary lists?
      //if (startTimes) {
      //  time.slots.forEach(t => {
      //    if (startTimes && startTimes.find(st => st[0] === t[0] && st[1] === t[1])) {
      //      startTimesDisplay.push(<h4 className="active" onClick={() => onRemove(list, t)}>{dateFormatted(t[0])}</h4>)
      //    } else {
      //      startTimesDisplay.push(<h4 onClick={() => onAdd(list, t)}>{dateFormatted(t[0])}</h4>)
      //    }
      //  })
      if (startTimes) {
        startTimesDisplay = time.slots.map(t => {
          //let startTimeIndex = startTimes.findIndex(st => st[0] === t[0] && st[1] === t[1]);
          if(startTimeIndex(startTimes, t) == -1){
            return (<h4>
              {dateFormatted(t[0])}
              <button className="addItinerary" onClick={() => onAdd(list, t)}/>
            </h4>)
          } else {
            return (<h4>
              {dateFormatted(t[0])}
              <button className="removeItinerary" onClick={() => onRemove(list, t)}/>
            </h4>)
          }
        });
      }
    }

    return(
      <li className="walklistItem">
        <div className="walk">
          <h3><a href={url}>{title}</a></h3>
          <h4>{meeting}</h4>
          {startTimesDisplay}
        </div>
        <button
          className="action removeWalk"
          onClick={() => onRemove(list)}
        />
        <button
          className={'action addWalk ' + (dialogOpen ? 'selected' : '')}
          onClick={() => this.setState({dialogOpen: !dialogOpen})}
        />

        {dialogOpen ? <AddWalkToList lists={lists} walk={walk} list={list} onAdd={onAdd} onRemove={onRemove} /> : null}
      </li>
    );
  }
}

Walk.propTypes = {
  title: React.PropTypes.string,
  time: React.PropTypes.number,
  meeting: React.PropTypes.string,
  id: React.PropTypes.number.isRequired,
  remove: React.PropTypes.func.isRequired
};

Walk.defaultProps = {
  title: 'Walk Title',
  time: {slots: [Date.now(), Date.now()]},
  remove: null
};

export default Walk;
