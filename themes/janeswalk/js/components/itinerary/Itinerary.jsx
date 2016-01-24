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
    const {walks, dialogOpen, listId, $el, walkDialogOpen} = this.state;

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
      <dialog open>
        <section id="itinerary">
          <i className="close fa fa-times" onClick={() => {
            //reset Add Walk Dialog if open
            if(walkDialogOpen) ItineraryActions.addWalkDialog();
            $el.modal('hide');
          }} />
          <AddWalkToListDialog {...this.state} {...ItineraryActions}/>
          <div className="itinerary">
            <section>
              <ItineraryHeader {...this.state} {...ItineraryActions}/>
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
