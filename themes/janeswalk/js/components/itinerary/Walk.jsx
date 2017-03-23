import { PropTypes, Component, createElement as ce } from 'react';
import AddWalkToList from './AddWalkToList.jsx';
import AddToItinerary from './AddToItinerary.jsx';

class Walk extends Component {
  constructor(...args) {
    super(...args);
    Object.assign(this, {
      state: {
        dialogOpen: false,
      },
      handleToggleDialog: () => this.setState({ dialogOpen: !this.state.dialogOpen }),
    });
  }

  componentWillReceiveProps({ list }) {
    // If the active list changes, close the dialog
    if (list !== this.props.list) {
      this.setState({ dialogOpen: false });
    }
  }

  render() {
    const { walk, list, lists, onAdd, onRemove, onSchedule, onUnschedule, schedule, isScheduled } = this.props;
    const { dialogOpen } = this.state;
    const {
      title,
      url,
      time,
      map: { markers: [{ title: meeting }] = [{}] } = {},
    } = walk;

    return (
      ce('li', { className: 'walklistItem' },
        ce('div', { className: 'walk' },
          ce('h3', {}, ce('a', { href: url }, title)),
          ce('h4', {}, meeting),
          ce(AddToItinerary, { schedule, time, walk, onSchedule, onUnschedule, isScheduled }),
        ),
        ce('button', { className: 'action removeWalk', onClick: () => onRemove(list) }),
        ce('button', {
          className: `action addWalk ${dialogOpen ? 'selected' : ''}`,
          onClick: this.handleToggleDialog },
        ),
        dialogOpen ? ce(AddWalkToList, { lists, walk, list, onAdd, onRemove }) : null,
      )
    );
  }
}

Walk.propTypes = {
  title: PropTypes.string,
  time: PropTypes.number,
  meeting: PropTypes.string,
  id: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};

Walk.defaultProps = {
  title: 'Walk Title',
  time: { slots: [Date.now(), Date.now()] },
  remove: null,
};

export default Walk;
