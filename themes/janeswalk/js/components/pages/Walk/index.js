/* global $ */
import { PropTypes, createElement as ce, Component } from 'react';

import ItineraryStore from 'janeswalk/stores/ItineraryStore.js';
import I18nStore from 'janeswalk/stores/I18nStore.js';
import UserStore from 'janeswalk/stores/UserStore';
import * as Action from 'janeswalk/actions/ItineraryActions';

import { Affix } from 'antd';
import Header from './Header';
import Description from './Description';
import Route from './Route';
import PublicTransit from './PublicTransit';
import Parking from './Parking';
import Start from './Start';
import Accessibility from './Accessibility';
import Team from './Team';
import Menu from './Menu';
import WalkMap from './Map';

import Layout from '../../../constants/Layout';

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
        themes,
        accessibles,
      },
      isFavourite,
      schedule,
    } = this.state;
    const { canEdit = false } = this.props;
    const hasMarkers = features.length > 0;

    const markers = features.filter(f => f.type === 'Feature' && f.geometry.type === 'Point');

    // FIXME: don't do all this direct this.state passing.
    return (
      ce('section', { className: 'walkPage' },
        ce(Header, {
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
        ce(Affix, { offsetTop: Layout.Nav.height - Layout.Nav.pad }, ce(Menu, this.state)),
        ce(Description, walk),
        hasMarkers ? ce(WalkMap, { features }) : null,
        hasMarkers ? [
          ce(Route, { key: 'walkRoute', markers }),
          ce(Start, { key: 'walkStart', ...walk }),
        ] : null,
        ce(Accessibility, { flags: accessibles }),
        ce(PublicTransit, walk),
        ce(Parking, walk),
        ce(Team, walk)
      )
    );
  }
}

WalkPage.propsType = {
  page: PropTypes.object.isRequired,
  walk: PropTypes.object.isRequired,
};
