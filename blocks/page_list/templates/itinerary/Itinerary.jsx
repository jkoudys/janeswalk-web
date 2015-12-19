import React from 'react';
import ItineraryStore from './ItineraryStore';
import ItineraryActions from './ItineraryActions';

import Walk from './Walk';
import ItineraryHeader from './ItineraryHeader';
import AddWalkToListDialog from './AddWalkToListDialog';

const getItinerary = () => ({
    walks: ItineraryStore.getItinerary().walks,
    title: ItineraryStore.getItinerary().title,
    description: ItineraryStore.getItinerary().description,
    lists: ItineraryStore.getAllLists(),
    activeWalk: ItineraryStore.getWalkSelected(),
    walkDialogOpen: ItineraryStore.getWalkDialog(),
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
    const {walks, title, description} = this.state;

    const ItineraryWalks = walks.map(({map, id, title, time}) =>
        <Walk
            title={title}
            meeting={map.markers[0].title}
            start={time.slots[0][0]}
            id={id}
            remove={ItineraryActions.remove}
            walkSelected={ItineraryActions.walkSelected}
            addWalkDialog={ItineraryActions.addWalkDialog}
        />
    );

    return (
      <dialog id="itinerary">
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
  itinerary: React.PropTypes.array,
};