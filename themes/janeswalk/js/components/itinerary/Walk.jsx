import {dateFormatted} from '../../utils/ItineraryUtils';
import {remove} from '../../actions/ItineraryActions';

import AddWalkToList from './AddWalkToList.jsx';

class Walk extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      dialogOpen: false
    };
  }

  render() {
    const {title, start, meeting, url, id, listId, lists} = this.props;
    const {dialogOpen} = this.state;

    return(
      <li className="walklistItem">
        <div className="walk">
          <h3><a href={url}>{title}</a></h3>
          <h4>{dateFormatted(start)}</h4>
          <h4>{meeting}</h4>
        </div>
        <button
          className="action removeWalk"
          onClick={() => remove(id, listId)}
        />
        <button
          className={'action addWalk ' + (dialogOpen ? 'selected' : '')}
          onClick={() => this.setState({dialogOpen: !dialogOpen})}
        />
        {dialogOpen ? <AddWalkToList lists={lists} activeWalk={title} /> : null}
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
