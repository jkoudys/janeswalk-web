import AddWalkToList from './AddWalkToList.jsx';
import AddToItinerary from './AddToItinerary.jsx';

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
    const {walk, list, lists, onAdd, onRemove, itinerary} = this.props;
    const {dialogOpen} = this.state;
    const {title, url, map, time} = walk;
    let meeting, start;

    if (map && map.markers[0]) {
      meeting = map.markers[0].title;
    }

    return(
      <li className="walklistItem">
        <div className="walk">
          <h3><a href={url}>{title}</a></h3>
          <h4>{meeting}</h4>
          <AddToItinerary itinerary={itinerary} time={time} walk={walk} onAdd={onAdd} onRemove={onRemove}/>
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
