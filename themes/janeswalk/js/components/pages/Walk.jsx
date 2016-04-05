/* global React */

import ItineraryStore from 'janeswalk/stores/ItineraryStore.js';
import * as Action from 'janeswalk/actions/ItineraryActions';

import WalkHeader from './Walk/WalkHeader.jsx';
import WalkDescription from './Walk/WalkDescription.jsx';
import WalkRoute from './Walk/WalkRoute.jsx';
import WalkPublicTransit from './Walk/WalkPublicTransit.jsx';
import WalkParking from './Walk/WalkParking.jsx';
import WalkStart from './Walk/WalkStart.jsx';
import WalkTeam from './Walk/WalkTeam.jsx';
import WalkMenu from './Walk/WalkMenu.jsx';
import WalkMap from './Walk/WalkMap.jsx';

const getWalk = ({ walk, page, city }) => {
  const [firstList] = ItineraryStore.getLists();
  return {
    walk,
    page,
    city,
    list: firstList,
    isFavourite: ItineraryStore.hasInList(walk),
    schedule: ItineraryStore.getSchedule(),
  };
};

export default class WalkPage extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);

    Object.assign(this, {
      state: getWalk(props),
      _onChange: () => {
        this.setState(getWalk);
      },
      handleSchedule: time => Action.schedule(this.state.walk, time),
      handleUnschedule: time => Action.unschedule(this.state.walk, time),
      handleAdd: () => Action.add(this.state.list, this.state.walk),
      handleRemove: () => Action.remove(this.state.list, this.state.walk),
    });
  }

  componentWillMount() {
    ItineraryStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ItineraryStore.removeChangeListener(this._onChange);
  }

  render() {
    const {
      walk,
      walk: {
        map = { markers: [], route: [] },
      },
      city,
      isFavourite,
      schedule,
    } = this.state;
    const hasMarkers = map.markers.length > 0;
    const hasRoute = map.route.length > 0;

    return (
      <section className="walkPage">
        <WalkHeader
          {...{ walk, city, isFavourite, schedule }}
          onSchedule={this.handleSchedule}
          onUnschedule={this.handleUnschedule}
          onAdd={this.handleAdd}
          onRemove={this.handleRemove}
        />
        <WalkMenu {...this.state} />
        <WalkDescription {...this.state.walk} />
        {hasMarkers || hasRoute ? <WalkMap map={map} /> : null}
        {hasMarkers ? [
          <WalkRoute {...this.state.walk} />,
          <WalkStart {...this.state.walk} />,
        ] : null}
        <WalkPublicTransit {...this.state.walk} />
        <WalkParking {...this.state.walk} />
        <WalkTeam {...this.state.walk} />
      </section>
    );
  }
}

WalkPage.propsType = {
  page: React.PropTypes.object.isRequired,
  walk: React.PropTypes.object.isRequired,
};
