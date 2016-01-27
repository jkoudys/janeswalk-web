import ItineraryStore from '../../stores/ItineraryStore.js';
import ItineraryActions from '../../actions/ItineraryActions.js';

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

import {walk, filters} from './Walk/WalkStaticData';

const walkId = walk.walk.id;

const getWalk = (props) => ({
  //TODO: Conditionals (? and ||) in getWalk are for stubbed data
  walk: props.walk || walk.walk,
  page: props.page || walk.page,
  city: props.city || walk.city,
  id: props.walk ? props.walk.id : walkId,
  filters: props.filters || filters,
  existsInItinerary: ItineraryStore.existsInList(ItineraryStore.getItineraryList().id, props.walk ? props.walk.id : walkId),
  existsInFavourites: ItineraryStore.existsInList(ItineraryStore.getFavouriteList().id, props.walk ? props.walk.id : walkId),
  //TODO: for stubbed data, assumed first list is Itinerary, second list is fav, need to update store for .json data
  itineraryListId: ItineraryStore.getItineraryList().id,
  favoriteListId: ItineraryStore.getFavouriteList().id,
});

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
    return (
      <section className="walkPage">
        <WalkHeader
        {...this.state}
        {...ItineraryActions}
        />
        <WalkMenu {...this.state}/>
        <WalkDescription {...this.state.walk}/>
        <WalkMap {...this.state.walk}/>
        <WalkRoute {...this.state.walk}/>
        <WalkStart {...this.state.walk}/>
        <WalkTeam {...this.state.walk}/>
      </section>
    );
  }
};

WalkPage.propsType = {
 page: React.PropTypes.object.isRequired,
 walk: React.PropTypes.object.isRequired,
};
