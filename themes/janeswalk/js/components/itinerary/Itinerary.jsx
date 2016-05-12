/* global React ReactDOM $ */

import ItineraryStore from 'janeswalk/stores/ItineraryStore';
import WalkStore from 'janeswalk/stores/WalkStore';
import * as Actions from 'janeswalk/actions/ItineraryActions';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

import Walk from './Walk.jsx';
import ItineraryHeader from './ItineraryHeader.jsx';
import ItinerarySelect from './ItinerarySelect.jsx';

const getItinerary = (list = [...ItineraryStore.getLists()][0]) => ({
  activeList: list,
  lists: ItineraryStore.getLists(),
  schedule: ItineraryStore.getSchedule(),
});

const formatICSDateTime = d => `${d.getUTCFullYear()}${('0' + (d.getUTCMonth() + 1)).slice(-2)}${d.getUTCDate()}T${d.getUTCHours()}${d.getUTCMinutes()}00`;


export default class Itinerary extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    Object.assign(this, {
      state: Object.assign({}, getItinerary(), props.itinerary),
      _onChange: () => this.setState(() => getItinerary(this.state.activeList)),
      handleHide: () => this.state.$el.modal('hide'),
      handleChooseItinerary: list => this.setState({ activeList: list }),
      handleChangeTitle: v => Actions.updateTitle(this.state.activeList, v),
      handleChangeDescription: v => Actions.updateDescription(this.state.activeList, v),
      handleICS: () => {
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

//        const timeSet = schedule.get(walk) || new Set();
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
      },
    });
  }

  componentWillMount() {
    ItineraryStore.addChangeListener(this._onChange);
    WalkStore.addChangeListener(this._onChange);
  }

  componentDidMount() {
    const $el = $(ReactDOM.findDOMNode(this));
    $el.modal();
    $el.on('hidden.bs.modal', () => this.props.onClose());

    this.setState({ $el });
  }

  componentWillUnmount() {
    ItineraryStore.removeChangeListener(this._onChange);
    WalkStore.removeChangeListener(this._onChange);
  }

  handleCreateItinerary() {
    Actions.createList(t`New Itinerary`);
  }

  render() {
    const { activeList, lists, schedule } = this.state;

    // Lookup the walk data from the walk's ID
    const ItineraryWalks = [...activeList.walks].map((walk) => {
      const onAdd = list => Actions.add(list, walk);
      const onRemove = list => Actions.remove(list, walk);
      const onSchedule = time => Actions.schedule(walk, time);
      const onUnschedule = time => Actions.unschedule(walk, time);

      return (
        <Walk
          key={walk.id}
          list={activeList}
          {...{ lists, walk, schedule, onAdd, onRemove, onSchedule, onUnschedule }}
        />
      );
    });

    return (
      <dialog open>
        <section id="itinerary">
          <i className="close fa fa-times" onClick={this.handleHide} />
          <ItinerarySelect
            onChoose={this.handleChooseItinerary}
            onCreate={this.handleCreateItinerary}
            {...{ lists, activeList }}
          />
          <div className="itinerary">
            <section>
              <ItineraryHeader
                onChangeDescription={this.handleChangeDescription}
                onChangeTitle={this.handleChangeTitle}
                list={activeList}
              />
            </section>
            <ul>
              <a onClick={this.handleICS}><i className="fa fa-calendar" /> Add to Calendar</a>
              {ItineraryWalks}
            </ul>
          </div>
          <p className="knightFdn-itinerary">{t`Powered by the Knight Foundation`}</p>
        </section>
      </dialog>
    );
  }
}
