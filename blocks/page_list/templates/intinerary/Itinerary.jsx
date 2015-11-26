import React from 'react';
import ItineraryStore from './Itinerary-Store';
import ItineraryActions from './Itinerary-Actions';

import Walk from './Walk';

const getItinerary = () => {
  return {
    walks: ItineraryStore.getItinerary().walks,
    title: ItineraryStore.getItinerary().title || "My Itinerary",
    description: ItineraryStore.getItinerary().description || "View my Jane's Walk Itinerary!",
  };
};

export default class Itinerary extends React.Component {
  constructor(props) {
    super(props);
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
    const itineraryWalks = walks.map((walk)=><Walk walk={walk} key={walk.id} remove={ItineraryActions.remove}/> );

    return (<div>
    {title}
    {description}
    {itineraryWalks}
    </div>);
		}
};