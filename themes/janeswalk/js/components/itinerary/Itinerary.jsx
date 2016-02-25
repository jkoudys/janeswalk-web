import ItineraryStore from 'janeswalk/stores/ItineraryStore';
import WalkStore from 'janeswalk/stores/WalkStore';
import * as Actions from 'janeswalk/actions/ItineraryActions';
import {t} from 'janeswalk/stores/I18nStore';

import Walk from './Walk.jsx';
import ItineraryHeader from './ItineraryHeader.jsx';
import ItinerarySelect from './ItinerarySelect.jsx';
import * as API from 'janeswalk/utils/api/Itinerary';

const getItinerary = (list = [...ItineraryStore.getLists()][0]) => ({
  activeList: list,
  lists: ItineraryStore.getLists(),
  schedule: ItineraryStore.getSchedule()
});

export default class Itinerary extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = Object.assign({}, getItinerary(), props.itinerary);
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    ItineraryStore.addChangeListener(this._onChange);
    WalkStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ItineraryStore.removeChangeListener(this._onChange);
    WalkStore.removeChangeListener(this._onChange);
  }

  componentDidMount() {
    const $el = $(React.findDOMNode(this));
    $el.modal();
    $el.on('hidden.bs.modal', () => this.props.onClose());

    this.setState({$el: $el});
  }

  _onChange() {
    this.setState(() => getItinerary(this.state.activeList));
  }

  render() {
    const {activeList, lists, schedule, $el} = this.state;

    // Lookup the walk data from the walk's ID
    const ItineraryWalks = [];
    activeList.walks.forEach((startTimes, walk) => {
      //TODO: why walk[0], wrong format? Could be how the walk is set ([walk,startTime of null]) for favourite
      walk = walk[0] || walk;
      ItineraryWalks.push(
        <Walk
          key={walk.id}
          list={activeList}
          onAdd={list => Actions.add(list, walk)}
          onRemove={list => Actions.remove(list, walk)}
          onSchedule={time => Actions.schedule(walk, time)}
          onUnschedule={time => Actions.unschedule(walk, time)}
          {...{lists, walk, schedule}}
        />
      );
    });

    return (
      <dialog open>
        <section id="itinerary">
          <i className="close fa fa-times" onClick={() => $el.modal('hide')} />
          <ItinerarySelect
            onChoose={list => this.setState({activeList: list})}
            onCreate={() => Actions.createList(t('New Itinerary'))}
            {...{lists, activeList}}
          />
          <div className="itinerary">
            <section>
              <ItineraryHeader
                onChangeDescription={v => Actions.updateDescription(activeList, v)}
                onChangeTitle={v => Actions.updateTitle(activeList, v)}
                list={activeList}
              />
            </section>
            <ul>
              {ItineraryWalks}
            </ul>
          </div>
          <p className="knightFdn-itinerary">Powered by the Knight Foundation</p>
        </section>
      </dialog>
    );
  }
}
