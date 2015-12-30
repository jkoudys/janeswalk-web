import ItineraryStore from '../../stores/ItineraryStore';
import ItineraryActions from '../../actions/ItineraryActions';

import Walk from './Walk.jsx';
import ItineraryHeader from './ItineraryHeader.jsx';
import AddWalkToListDialog from './AddWalkToListDialog.jsx';

const getItinerary = () => ({
  walks: ItineraryStore.getActiveList().walks,
  title: ItineraryStore.getActiveList().title,
  description: ItineraryStore.getActiveList().description,
  lists: ItineraryStore.getAllLists(),
  activeWalk: ItineraryStore.getWalkSelected(),
  walkDialogOpen: ItineraryStore.getWalkDialog(),
  dialogOpen: ItineraryStore.getDialog(),
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

  _onChange() {
    this.setState(getItinerary);
  }

  render() {
    const {walks, dialogOpen, listId} = this.state;

    const ItineraryWalks = walks.map(({map, id, title, time}) =>
        <Walk
            title={title}
            meeting={map.markers[0].title}
            start={time.slots[0][0]}
            id={id}
            key={id}
            remove={ItineraryActions.remove}
            walkSelected={ItineraryActions.walkSelected}
            addWalkDialog={ItineraryActions.addWalkDialog}
            listId={listId}
        />
    );

    return (
      <dialog open id="itinerary">
        <AddWalkToListDialog {...this.state} {...ItineraryActions}/>
        <div className="itinerary">
          <section>
            <ItineraryHeader {...this.state} {...ItineraryActions}/>
          </section>
          <ul>
            {ItineraryWalks}
          </ul>
        </div>
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
