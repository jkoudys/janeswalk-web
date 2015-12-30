//TODO: Define as a path in a common place to share with other components
import ItineraryActions from '../../../../../../blocks/page_list/templates/itinerary/ItineraryActions';
import ItineraryStore from '../../../../../../blocks/page_list/templates/itinerary/ItineraryStore';

import WalkHeader from './WalkHeader.jsx';
import WalkDescription from './WalkDescription.jsx';
import WalkRoute from './WalkRoute.jsx';
import WalkAccessibility from './WalkAccessibility.jsx';
import WalkPublicTransit from './WalkPublicTransit.jsx';
import WalkParking from './WalkParking.jsx';
import WalkStart from './WalkStart.jsx';
import WalkTeam from './WalkTeam.jsx';
import WalkMenu from './WalkMenu.jsx';
import WalkMap from './WalkMap.jsx';

import {walk, filters} from './WalkStaticData';
import './view.less';

const walkId = walk.walk.id;
const itineraryListId = ItineraryStore.getItineraryList().id; //for stubbed data, assumed first list is Itinerary
const favoriteListId = ItineraryStore.getFavouriteList().id; //for stubbed data, assumed second list is fav

const getWalk = (props) => ({
  //TODO: Conditionals (? and ||) in getWalk are for stubbed data
  walk: props.walk || walk.walk,
  page: props.page || walk.page,
  city: props.city || walk.city,
  id: props.walk ? props.walk.id : walkId,
  filters: props.filters || filters,
  existsInItinerary : ItineraryStore.existsInList(itineraryListId, props.walk ? props.walk.id : walkId),
  existsInFavourites : ItineraryStore.existsInList(favoriteListId, props.walk ? props.walk.id : walkId),
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
    <div className="walkPage">

      <WalkHeader
        {...this.state}
        {...ItineraryActions}
        itineraryListId={itineraryListId}
        favoriteListId={favoriteListId}
      />

      <WalkMenu {...this.state}/>

      <WalkDescription {...this.state.walk}/>

      <WalkMap {...this.state.walk}/>

      <WalkRoute {...this.state.walk}/>

      <WalkStart {...this.state.walk}/>

      <WalkTeam {...this.state.walk}/>

    </div>);
  }
};

WalkPage.propsType = {
 page: React.PropTypes.object.isRequired,
 walk: React.PropTypes.object.isRequired,
};