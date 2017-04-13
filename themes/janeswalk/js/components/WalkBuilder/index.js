/**
 * Walk Builder
 *
 * The main walk builder itself. The component for building a walk!
 */
import { createElement as ce, Component } from 'react';
import { Button, Form, Modal, Row, Col, notification } from 'antd';

import t from 'es2015-i18n-tag';
import WalkBuilderStore, { memberDefaults } from 'janeswalk/stores/WalkBuilderStore';
import { save, publish } from 'janeswalk/utils/api/Walk';

import * as WBA from 'janeswalk/actions/WalkBuilderActions';

import WalkPage from '../pages/Walk';
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
  error: WalkBuilderStore.getError(),
  canUndo: !!WalkBuilderStore.getPointsHistory().length,
  empty: WalkBuilderStore.getEmptyRequiredFields(),
});

export default class WalkBuilder extends Component {
  state = { menuOptions: [], ...buildState() };

  componentWillMount() {
    WalkBuilderStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    this.setState({ menuOptions: this.menuOptions });
  }

  componentWillUnmount() {
    WalkBuilderStore.removeChangeListener(this.onChange);
  }

  onChange = () => this.setState(buildState);

  componentWillUpdate(nextProps, { error }) {
    // If it's a newly received error, and not the one we're currently showing.
    if (error && this.state.error !== error) {
      notification.error({
        message: t`Error`,
        description: `${error} ` + t`Your changes are not being saved. Try logging in again. Please contact tech@janeswalk.org for help if you repeatedly see this problem.`,
        duration: 0,
        placement: 'bottomRight',
      });
    }
  }

  // { value, onChange } for each form field
  handlers = {
    ward: (value) => WBA.setWard(value),
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
    pointUndo: () => WBA.undoPoint(),
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
    preview: assign(() => this.setState({ preview: true }), {
      close: () => this.setState({ preview: false }),
    }),
  };

  render() {
    const {
      accessibleInfo,
      accessibleFind,
      accessibleTransit,
      accessibles,
      canUndo,
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
      ward,
      preview,
    } = this.state;
    const {
      city: { cityOrganizer, wards },
      city,
      valt,
    } = this.props;
    const {
     handlers,
    } = this;

    const lastWord = empty.length ? ce(DontForget, { empty, handlers }) : ce(Finished, { publishing, handlers });

    return ce(Form, { className: 'WalkBuilder' },
      ce(Modal, {
        visible: preview,
        width: '95%',
        title: t`Preview`,
        onCancel: handlers.preview.close,
        footer: ce(Button, { onClick: handlers.preview.close }, t`Close`),
        style: { top: 75 },
      },
        preview ? ce(WalkPage, { walk: WalkBuilderStore.getSchema(), city }) : null,
      ),
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
          ward,
          wards,
          valt,
        }),
        ce(Theme, { name: t`Themes`, themes, handlers }),
        ce(RouteBuilder, {
          name: t`Share Your Route`,
          city,
          points,
          canUndo,
          route,
          handlers,
        }),
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
      ),
    );
  }
}
