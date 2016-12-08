/**
 * Walk Builder
 *
 * The main walk builder itself. The component for building a walk!
 */
import I18nStore, { translateTag as t } from 'janeswalk/stores/I18nStore';
import WalkBuilderStore from 'janeswalk/stores/WalkBuilderStore';

import * as WBA from 'janeswalk/actions/WalkBuilderActions';

import Welcome from './Welcome';
import Navigator from './Navigator';
import SaveTheDate from './SaveTheDate';
import WalkDetails from './WalkDetails';
import Theme from './Theme';
import RouteBuilder from './RouteBuilder';
import AddDates from './AddDates';
import Accessibility from './Accessibility';
import Team from './Team';
import Finished from './Finished';
import DontForget from './DontForget';

import Layout from '../../constants/Layout';

import { createElement as ce, Component } from 'react';
import { Form, Row, Col } from 'antd';
const { assign } = Object;

const buildState = () => ({
  ...WalkBuilderStore.getWalk(),
  empty: WalkBuilderStore.getEmptyRequiredFields(),
});

export default class WalkBuilder extends Component {
  constructor(props) {
    super(props);
    assign(this, {
      state: { menuOptions: [], ...buildState() },
      onChange: () => this.setState(buildState),
      // { value, onChange } for each form field
      handlers: {
        title: ({ target: { value } }) => WBA.setTitle(value),
        longDescription: ({ target: { value } }) => WBA.setLongDescription(value),
        shortDescription: ({ target: { value } }) => WBA.setShortDescription(value),
        times: (oldTime) => time => WBA.setTime(time, oldTime),
        duration: ({ target: { value } }) => WBA.setDuration(value),
        // Use function-props pattern for alternate actions. Default assumes onChange
        images: assign(({ file }) => WBA.setImage(file), {
          remove: () => WBA.removeImage(),
        }),
        themes: theme => assign(() => WBA.setTheme(theme), { remove: () => WBA.removeTheme(theme) }),
      },
    });
  }

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

  render() {
    const {
      menuOptions,
      empty,
      title,
      shortDescription,
      longDescription,
      times: [time],
      times,
      images,
      themes,
      duration,
    } = this.state;
    const {
      city: { cityOrganizer },
      city,
      valt,
    } = this.props;
    const {
     handlers,
    } = this;

    const lastWord = empty.length ? ce(DontForget, { empty }) : ce(Finished);

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
        ce(RouteBuilder, { name: t`Share Your Route`, city }),
        ce(AddDates, { name: t`Set the Date`, times, duration, handlers }),
        ce(Accessibility, { name: t`Accessibility` }),
        ce(Team, { name: t`Create Your Team` }),
        lastWord,
      )
    );
  }
}
