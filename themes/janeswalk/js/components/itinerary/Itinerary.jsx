import ItineraryStore from '../../stores/ItineraryStore';
import {remove, walkSelected, updateTitle, updateDescription} from '../../actions/ItineraryActions';

import Walk from './Walk.jsx';
import ItineraryHeader from './ItineraryHeader.jsx';
import ItinerarySelect from './ItinerarySelect.jsx';

const getItinerary = () => ({
  walks: ItineraryStore.getActiveList().walks,
  title: ItineraryStore.getActiveList().title,
  description: ItineraryStore.getActiveList().description,
  lists: ItineraryStore.getAllLists(),
  activeWalk: ItineraryStore.getWalkSelected(),
  listId: ItineraryStore.getActiveList().id,
});

export default class Itinerary extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = props.itinerary || getItinerary();
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    ItineraryStore.addChangeListener( this._onChange );
  }

  componentWillUnmount() {
    ItineraryStore.removeChangeListener( this._onChange );
  }

  componentDidMount() {
    const $el = $(React.findDOMNode(this));
    $el.modal();
    $el.on('hidden.bs.modal', () => this.props.onClose());

    this.setState({$el: $el});
  }

  _onChange() {
    this.setState(getItinerary);
  }

  render() {
    const {walks, listId, lists, activeWalk, $el} = this.state;

    // Lookup the walk data from the walk's ID
    const ItineraryWalks = walks.map(walkId => {
        const {map, id, title, time, url} = ItineraryStore.getWalks()[walkId];
        return (
          <Walk
            title={title}
            url={url}
            meeting={map ? map.markers[0] ? map.markers[0].title : null : null}
            start={time ? time.slots[0][0] : null}
            id={id}
            key={id}
            listId={listId}
            lists={lists}
          />
        );
    });

    return (
      <dialog open>
        <section id="itinerary">
          <i className="close fa fa-times" onClick={() => {
            //reset Add Walk Dialog if open
            $el.modal('hide');
          }} />
          <ItinerarySelect lists={lists} activeList={listId} />
          <div className="itinerary">
            <section>
              <ItineraryHeader
                onChangeDescription={v => updateDescription(v)}
                onChangeTitle={v => updateTitle(v)}
                {...this.state}
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
