import { PropTypes, Component, createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

import AddWalkToList from './AddWalkToList.jsx';
import AddToItinerary from './AddToItinerary.jsx';

class Walk extends Component {
  state = {
    dialogOpen: false,
  };

  handlers = {
    dialog: Object.assign(() => this.setState({ dialogOpen: true }), {
      close: () => this.setState({ dialogOpen: false }),
    }),
  };

  componentWillReceiveProps({ list }) {
    // If the active list changes, close the dialog
    if (list !== this.props.list) {
      this.setState({ dialogOpen: false });
    }
  }

  render() {
    const { walk, list, lists, onAdd, onRemove, onSchedule, onUnschedule, schedule, isScheduled } = this.props;
    const { dialogOpen } = this.state;
    const { dialog } = this.handlers;
    const {
      title = t`Walk Title`,
      url,
      time = { slots: [Date.now(), Date.now()] },
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
          onClick: dialogOpen ? dialog.close : dialog },
        ),
        dialogOpen ? ce(AddWalkToList, { lists, walk, list, onAdd, onRemove }) : null,
      )
    );
  }
}

export default Walk;
