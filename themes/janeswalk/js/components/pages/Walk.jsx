import ItineraryStore from 'janeswalk/stores/ItineraryStore.js';
import * as Action from 'janeswalk/actions/ItineraryActions';

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
  let [firstList] = ItineraryStore.getLists();
  return {walk, page, city, list: firstList, isFavourite: ItineraryStore.hasInList(walk), schedule: ItineraryStore.getSchedule()}
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
    const {walk, page, city, list, isFavourite, schedule} = this.state;
    let hasMarkers = false, hasRoute = false;
    if (walk && walk['map']) {
      hasMarkers = (walk['map']['markers'].length > 0);
      hasRoute = (walk['map']['route'].length > 0);
    }

    return (
      <section className="walkPage">
        <WalkHeader
          {...{walk, city, isFavourite, schedule}}
          onSchedule={t => Action.schedule(walk, t)}
          onUnschedule={t => Action.unschedule(walk, t)}
          onAdd={() => Action.add(list, walk)}
          onRemove={() => Action.remove(list, walk)}
        />
        <WalkMenu {...this.state} />
        <WalkDescription {...this.state.walk} />
        {hasMarkers || hasRoute ? <WalkMap map={this.state.walk['map']} /> : null}
        {hasMarkers ? <WalkRoute {...this.state.walk} /> : null}
        {hasMarkers ? <WalkStart {...this.state.walk} /> : null}
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
