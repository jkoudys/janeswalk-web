import React from 'react';
import ItineraryStore from './ItineraryStore';
import ItineraryActions from './ItineraryActions';

import Walk from './Walk';

const getItinerary = () => ({
    walks: ItineraryStore.getItinerary().walks,
    title: ItineraryStore.getItinerary().title || "My Itinerary",
    description: ItineraryStore.getItinerary().description || "View my Jane's Walk Itinerary!",
});

export default class Itinerary extends React.Component {
  getDefaultProps() {
    return {
      itinerary: null,
    };
  }

  propTypes() {
    return {
      itinerary: React.PropTypes.array,
    };
  }

  constructor(...args) {
    super(...args);
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
            key={id}
            remove={ItineraryActions.remove}
        />
    );

    return (
      <dialog id="itinerary">
        <div class="itinerary">
          <article>
            <header>
              <h2> {title} </h2>
            </header>
          </article>
          <section>
            {description}
          </section>
          <section>
            {ItineraryWalks}
          </section>
        </div>
      </dialog>
    );
  }
}
