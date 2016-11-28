/* global $ */

import ItineraryStore from 'janeswalk/stores/ItineraryStore.js';
import I18nStore from 'janeswalk/stores/I18nStore.js';
import UserStore from 'janeswalk/stores/UserStore';
import * as Action from 'janeswalk/actions/ItineraryActions';

import { Affix } from 'antd';

import WalkHeader from './Walk/WalkHeader.jsx';
import WalkDescription from './Walk/WalkDescription.jsx';
import WalkRoute from './Walk/WalkRoute.jsx';
import WalkPublicTransit from './Walk/WalkPublicTransit.jsx';
import WalkParking from './Walk/WalkParking.jsx';
import WalkStart from './Walk/WalkStart.jsx';
import WalkAccessibility from './Walk/WalkAccessibility.jsx';
import WalkTeam from './Walk/WalkTeam.jsx';
import WalkMenu from './Walk/WalkMenu.jsx';
import WalkMap from './Walk/WalkMap.jsx';

import { PropTypes, createElement as ce, Component } from 'react';

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

export default class WalkPage extends Component {
  constructor(props, ...args) {
    super(props, ...args);

    Object.assign(this, {
      state: getWalk(props),
      _onChange: () => {
        this.setState(getWalk);
      },
      handleSchedule: time => {
        if (UserStore.getCurrent()) {
          Action.schedule(this.state.walk, time);
        } else {
          $('#login').modal();
        }
      },
      handleUnschedule: time => Action.unschedule(this.state.walk, time),
      handleAdd: () => {
        if (UserStore.getCurrent()) {
          Action.add(this.state.list, this.state.walk);
        } else {
          $('#login').modal();
        }
      },
      handleRemove: () => Action.remove(this.state.list, this.state.walk),
    });
  }

  componentWillMount() {
    ItineraryStore.addChangeListener(this._onChange);
    I18nStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ItineraryStore.removeChangeListener(this._onChange);
    I18nStore.removeChangeListener(this._onChange);
  }

  render() {
    const {
      city,
      walk,
      walk: {
        features = [],
        checkboxes,
      },
      isFavourite,
      schedule,
    } = this.state;
    const { canEdit = false } = this.props;
    const hasMarkers = features.length > 0;
    const accessibleFlags = Object.keys(checkboxes).filter(k => k.includes('accessible-')).map(k => k.slice(11));

    const markers = features.filter(f => f.type === 'Feature' && f.geometry.type === 'Point');

    // FIXME: don't do all this direct this.state passing.
    return (
      ce('section', { className: 'walkPage' },
        ce(WalkHeader, {
          walk,
          canEdit,
          city,
          isFavourite,
          schedule,
          onSchedule: this.handleSchedule,
          onUnschedule: this.handleUnschedule,
          onAdd: this.handleAdd,
          onRemove: this.handleRemove,
        }),
        ce(Affix, { offsetTop: 80 }, ce(WalkMenu, this.state)),
        ce(WalkDescription, walk),
        hasMarkers ? ce(WalkMap, { features }) : null,
        hasMarkers ? [
          ce(WalkRoute, { key: 'walkRoute', markers }),
          ce(WalkStart, { key: 'walkStart', ...walk }),
        ] : null,
        ce(WalkAccessibility, { flags: accessibleFlags }),
        ce(WalkPublicTransit, walk),
        ce(WalkParking, walk),
        ce(WalkTeam, walk)
      )
    );
  }
}

WalkPage.propsType = {
  page: PropTypes.object.isRequired,
  walk: PropTypes.object.isRequired,
};
