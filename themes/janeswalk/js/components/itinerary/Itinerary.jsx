import ItineraryStore from '../../stores/ItineraryStore';
import WalkStore from '../../stores/WalkStore';
import {add, remove, updateTitle, updateDescription, createList} from '../../actions/ItineraryActions';
import {t} from 'janeswalk/stores/I18nStore';

import Walk from './Walk.jsx';
import ItineraryHeader from './ItineraryHeader.jsx';
import ItinerarySelect from './ItinerarySelect.jsx';
import * as API from '../../utils/api/Itinerary';

const getItinerary = (list = ItineraryStore.getItineraryList()) => ({
  activeList: list,
  lists: ItineraryStore.getLists()
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
    const {activeList, lists, $el} = this.state;

    // Lookup the walk data from the walk's ID
    const ItineraryWalks = [];
    activeList.walks.forEach((startTimes, walk) => {
      //TODO: why walk[0], wrong format? Could be how the walk is set ([walk,startTime of null]) for favourite
      walk = walk[0] || walk;
      ItineraryWalks.push(
        <Walk
          key={walk.id}
          list={activeList}
          lists={lists}
          walk={walk}
          startTimes={startTimes ? startTimes : null}
          onAdd={(list, time) => add(list, walk, time)}
          onRemove={(list, time) => remove(list, walk, time)}
        />
      );
    });

    return (
      <dialog open>
        <section id="itinerary">
          <i className="close fa fa-times" onClick={() => $el.modal('hide')} />
          <ItinerarySelect
            lists={lists}
            activeList={activeList}
            onChoose={list => this.setState({activeList: list})}
            onCreate={() => createList(t('New Itinerary'))}
          />
          <div className="itinerary">
            <section>
              <ItineraryHeader
                onChangeDescription={v => updateDescription(activeList, v)}
                onChangeTitle={v => updateTitle(activeList, v)}
                list={activeList}
              />
            </section>
            <ul>
              {ItineraryWalks}
            </ul>
          </div>
        </section>
      </dialog>
    );
  }
}

Itinerary.defaultProps = {
  itinerary: null,
};

Itinerary.propTypes = {
  itinerary: React.PropTypes.array.isRequired,
};
