/* global jQuery */

import ItineraryStore from 'janeswalk/stores/ItineraryStore';
import WalkStore from 'janeswalk/stores/WalkStore';
import * as Actions from 'janeswalk/actions/ItineraryActions';
import { Modal } from 'antd';
import t from 'es2015-i18n-tag';

import Walk from './Walk.jsx';
import ItineraryHeader from './ItineraryHeader.jsx';
import ItinerarySelect from './ItinerarySelect.jsx';

const getItinerary = (list = [...ItineraryStore.getLists()][0]) => ({
  activeList: list,
  lists: ItineraryStore.getLists(),
  schedule: ItineraryStore.getSchedule(),
});

import { Component, createElement as ce } from 'react';

const formatICSDateTime = d => `${d.getUTCFullYear()}${('0' + (d.getUTCMonth() + 1)).slice(-2)}${d.getUTCDate()}T${d.getUTCHours()}${d.getUTCMinutes()}00`;

export default class Itinerary extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    // TODO: remove props dependency
    this.state = {
      ...getItinerary(),
      ...props.itinerary,
      visible: false,
    };
  }

  _onChange = () => this.setState(() => getItinerary(this.state.activeList));

  handleChooseItinerary = list => this.setState({ activeList: list });
  handleChangeTitle = v => Actions.updateTitle(this.state.activeList, v);
  handleChangeDescription = v => Actions.updateDescription(this.state.activeList, v);

  handleICS = (walk) => {
    const { activeList, schedule } = this.state;
    const events = [...activeList.walks].map((walk) => {
    const timeSet = schedule.get(walk) || new Set();
    const {
      title,
      shortDescription,
      team: [{ email }] = [{}],
      map: { markers: [{ title: location }] = [{}] } = {},
    } = walk;
    return [...timeSet].map(time => {
      const d = new Date(time);
      return (
`BEGIN:VEVENT
SUMMARY:${title}
LOCATION:${location}
UID:${email}
DESCRIPTION:${shortDescription}
DTSTART:${formatICSDateTime(d)}
DTSTAMP:${formatICSDateTime(d)}
END:VEVENT`
        );
      }).join('\n');
    });
    const link = document.createElement('a');
    const ics =
`BEGIN:VCALENDAR
PRODID:-//JanesWalk//JanesWalk.org//EN
VERSION:1.0
METHOD:PUBLISH
${events.join('\n')}
END:VCALENDAR`;

    link.href = `data:application/ics,${encodeURI(ics)}`;
    link.download = 'JanesWalk.ics';
    link.click();
  };

  onCancel = () => {
    this.props.onClose();
    this.setState({ visible: false });
  };

  componentWillMount() {
    ItineraryStore.addChangeListener(this._onChange);
    WalkStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ItineraryStore.removeChangeListener(this._onChange);
    WalkStore.removeChangeListener(this._onChange);
  }

  handleCreateItinerary() {
    Actions.createList(t`New Itinerary`);
  }

  render() {
    const { activeList = { walks: [] }, lists, schedule } = this.state;
    const { onCancel, visible } = this.props;

    // Lookup the walk data from the walk's ID
    const ItineraryWalks = [...activeList.walks].map((walk) => {
      const onAdd = list => Actions.add(list, walk);
      const onRemove = list => Actions.remove(list, walk);
      const onSchedule = time => Actions.schedule(walk, time);
      const onUnschedule = time => Actions.unschedule(walk, time);

      return (
        ce(Walk, {
          key: walk.id,
          list: activeList,
          lists,
          walk,
          schedule,
          onAdd,
          onRemove,
          onSchedule,
          onUnschedule,
        })
      );
    });

    return (
      ce(Modal, {
        visible,
        onCancel,
        className: 'Itinerary',
        width: 700,
        footer: ce('p', { className: 'knightFdn-itinerary' }, t`Powered by the Knight Foundation`),
      },
        ce(ItinerarySelect, {
          onChoose: this.handleChooseItinerary,
          onCreate: this.handleCreateItinerary,
          lists,
          activeList,
        }),
        ce('section', {},
          ce(ItineraryHeader, {
            onChangeDescription: this.handleChangeDescription,
            onChangeTitle: this.handleChangeTitle,
            list: activeList,
          }),
        ),
        ce('ul', {},
          ce('a', { onClick: this.handleICS },
            ce('i', { className: 'fa fa-calendar' }),
            ' ',
            t`Add to Apple Calendar`,
          ),
          ItineraryWalks
        ),
      )
    );
  }
}
