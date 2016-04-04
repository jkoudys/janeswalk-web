/* global React $ */

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
    });
  }

  componentWillMount() {
    ItineraryStore.addChangeListener(this._onChange);
    WalkStore.addChangeListener(this._onChange);
  }

  componentDidMount() {
    const $el = $(React.findDOMNode(this));
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
    const ItineraryWalks = [];
    activeList.walks.forEach((startTimes, walk) => {
      const onAdd = list => Actions.add(list, walk);
      const onRemove = list => Actions.remove(list, walk);
      const onSchedule = time => Actions.schedule(walk, time);
      const onUnschedule = time => Actions.unschedule(walk, time);

      ItineraryWalks.push(
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
              {ItineraryWalks}
            </ul>
          </div>
          <p className="knightFdn-itinerary">{t`Powered by the Knight Foundation`}</p>
        </section>
      </dialog>
    );
  }
}
