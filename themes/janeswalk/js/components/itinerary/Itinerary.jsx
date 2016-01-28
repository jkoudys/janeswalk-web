import ItineraryStore from '../../stores/ItineraryStore';
import {remove, walkSelected, updateTitle, updateDescription} from '../../actions/ItineraryActions';

import Walk from './Walk.jsx';
import ItineraryHeader from './ItineraryHeader.jsx';
import AddWalkToListDialog from './AddWalkToListDialog.jsx';
import WalkListDialog from './WalkListDialog.jsx';

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

    const ItineraryWalks = walks.map(({map, id, title, time, url}) =>
        <Walk
            title={title}
            url = {url}
            meeting={map.markers[0].title}
            start={time.slots[0][0]}
            id={id}
            key={id}
            remove={remove}
            walkSelected={walkSelected}
            addWalkDialog={addWalkDialog}
            listId={listId}
        />
    );

    return (
      <dialog open>
        <section id="itinerary">
          <i className="close fa fa-times" onClick={() => {
            //reset Add Walk Dialog if open
            $el.modal('hide');
          }} />
          {activeWalk ? <AddWalkToListDialog lists={lists} activeWalk={activeWalk} /> : <WalkListDialog lists={lists} />}
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
