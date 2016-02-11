import ItineraryStore from '../../stores/ItineraryStore.js';
import {add, remove} from '../../actions/ItineraryActions';

import WalkHeader from './Walk/WalkHeader.jsx';
import WalkDescription from './Walk/WalkDescription.jsx';
import WalkRoute from './Walk/WalkRoute.jsx';
import WalkAccessibility from './Walk/WalkAccessibility.jsx';
import WalkPublicTransit from './Walk/WalkPublicTransit.jsx';
import WalkParking from './Walk/WalkParking.jsx';
import WalkStart from './Walk/WalkStart.jsx';
import WalkTeam from './Walk/WalkTeam.jsx';
import WalkMenu from './Walk/WalkMenu.jsx';
import WalkMap from './Walk/WalkMap.jsx';

const getWalk = ({walk, page, city}) => {
  const itinerary = ItineraryStore.getItineraryList();
  const favourites = ItineraryStore.getFavouriteList();
  return {walk, page, city, itinerary, favourites};
};

export default class WalkPage extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);

    this.state = getWalk(props);
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    ItineraryStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ItineraryStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getWalk);
  }

  render() {
    const {walk, page, city, itinerary, favourites} = this.state;

    return (
      <section className="walkPage">
        <WalkHeader
          walk={walk}
          city={city}
          itinerary={itinerary}
          favourites={favourites}
          onAdd={(list, time) => add(list, walk, time)}
          onRemove={(list, time) => remove(list, walk, time)}
        />
        <WalkMenu {...this.state} />
        <WalkDescription {...this.state.walk} />
        <WalkMap {...this.state.walk} />
        <WalkRoute {...this.state.walk} />
        <WalkStart {...this.state.walk} />
        <WalkPublicTransit {...this.state.walk} />
        <WalkParking {...this.state.walk} />
        <WalkTeam {...this.state.walk} />
      </section>
    );
  }
};

WalkPage.propsType = {
 page: React.PropTypes.object.isRequired,
 walk: React.PropTypes.object.isRequired,
};
