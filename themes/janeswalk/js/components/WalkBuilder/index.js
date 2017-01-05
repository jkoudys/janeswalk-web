/**
 * Walk Builder
 *
 * The main walk builder itself. The component for building a walk!
 */
import { createElement as ce, Component } from 'react';
import { Form, Row, Col } from 'antd';

import I18nStore, { translateTag as t } from 'janeswalk/stores/I18nStore';
import WalkBuilderStore, { memberDefaults } from 'janeswalk/stores/WalkBuilderStore';
import { save, publish } from 'janeswalk/utils/api/Walk';

import * as WBA from 'janeswalk/actions/WalkBuilderActions';

import Welcome from './Welcome';
import Navigator from './Navigator';
import WalkDetails from './WalkDetails';
import Theme from './Theme';
import RouteBuilder from './RouteBuilder';
import AddDates from './AddDates';
import Accessibility from './Accessibility';
import Team from './Team';
import Finished from './Finished';
import DontForget from './DontForget';

import Layout from '../../constants/Layout';

const { assign } = Object;

const buildState = () => ({
  ...WalkBuilderStore.getWalk(),
  empty: WalkBuilderStore.getEmptyRequiredFields(),
});

export default class WalkBuilder extends Component {
  state = { menuOptions: [], ...buildState() };

  componentWillMount() {
    I18nStore.addChangeListener(this.onChange);
    WalkBuilderStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    this.setState({ menuOptions: this.menuOptions });
  }

  componentWillUnmount() {
    I18nStore.removeChangeListener(this.onChange);
    WalkBuilderStore.removeChangeListener(this.onChange);
  }

  onChange = () => this.setState(buildState);

  // { value, onChange } for each form field
  handlers = {
    title: ({ target: { value } }) => WBA.setTitle(value),
    longDescription: ({ target: { value } }) => WBA.setLongDescription(value),
    shortDescription: ({ target: { value } }) => WBA.setShortDescription(value),
    accessibleInfo: ({ target: { value } }) => WBA.setAccessibleInfo(value),
    accessibleTransit: ({ target: { value } }) => WBA.setAccessibleTransit(value),
    accessibleFind: ({ target: { value } }) => WBA.setAccessibleFind(value),
    times: (oldTime) => time => WBA.setTime(time, oldTime),
    duration: ({ target: { value } }) => WBA.setDuration(value),
    // Use function-props pattern for alternate actions. Default assumes onChange
    images: assign(({ file }) => WBA.setImage(file), {
      remove: () => WBA.removeImage(),
    }),
    themes: theme => assign(() => WBA.setTheme(theme), {
      remove: () => WBA.removeTheme(theme),
    }),
    accessibles: accessible => assign(() => WBA.setAccessible(accessible), {
      remove: () => WBA.removeAccessible(accessible),
    }),
    teamMember: member => assign(prop => ({ target: { value } }) => WBA.updateMember(member, { [prop]: value }), {
      remove: () => WBA.removeMember(member),
    }),
    teamAddLeader: () => WBA.addMember(memberDefaults.leader),
    teamAddVolunteer: () => WBA.addMember(memberDefaults.volunteer),
    teamAddOrganizer: () => WBA.addMember(memberDefaults.organizer),
    teamAddVoice: () => WBA.addMember(memberDefaults.voice),
    pointAdd: ({ lat, lng }) => WBA.addPoint([lng, lat]),
    point: point => assign(({ lat, lng }) => WBA.updatePoint(point, { coordinates: [lng, lat] }), {
      // Update the properties of a point, e.g. title
      update: prop => ({ target: { value } }) => WBA.updatePoint(point, { properties: { [prop]: value } }),
      increment: () => WBA.setPointIndex(point, { change: 1 }),
      decrement: () => WBA.setPointIndex(point, { change: -1 }),
      remove: () => WBA.removePoint(point),
    }),
    publishWalk: async () => {
      this.setState({ publishing: true });
      await publish(WalkBuilderStore.getSchema());
      this.setState({ publishing: false });
      console.log(status);
      window.location = `/index.php?cID=${this.state.cID}`;
    },
  };

  render() {
    const {
      accessibleInfo,
      accessibleFind,
      accessibleTransit,
      accessibles,
      duration,
      empty,
      images,
      longDescription,
      menuOptions,
      points,
      route,
      shortDescription,
      team,
      themes,
      times,
      times: [time],
      title,
      publishing,
      saving,
    } = this.state;
    const {
      city: { cityOrganizer },
      city,
      valt,
    } = this.props;
    const {
     handlers,
    } = this;

    const lastWord = empty.length ? ce(DontForget, { saving, empty, handlers }) : ce(Finished, { publishing, handlers });

    return ce(Form, { className: 'WalkBuilder' },
      ce(Row, { type: 'flex', justify: 'center' },
        ce(Col, Layout.Full,
          ce(Welcome, { name: t`Save the Date!`, cityOrganizer, title, time, handlers })
        )
      ),
      ce(Navigator, { menuOptions },
        ce(WalkDetails, {
          name: t`Describe Your Walk`,
          title,
          shortDescription,
          longDescription,
          handlers,
          images,
          valt,
        }),
        ce(Theme, { name: t`Themes`, themes, handlers }),
        ce(RouteBuilder, { name: t`Share Your Route (under construction)`, city, points, route, handlers }),
        ce(AddDates, { name: t`Add Additional Dates`, times, duration, handlers }),
        ce(Accessibility, {
          name: t`Accessibility`,
          accessibles,
          accessibleInfo,
          accessibleFind,
          accessibleTransit,
          handlers,
        }),
        ce(Team, { name: t`Create Your Team`, team, handlers }),
        lastWord,
      )
    );
  }
}
