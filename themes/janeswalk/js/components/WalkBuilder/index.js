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
const { create, assign } = Object;

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
      handlers: {
        changeTitle: ({ target: { value } }) => WBA.setTitle(value),
        changeLongDescription: ({ target: { value } }) => WBA.setLongDescription(value),
        changeShortDescription: ({ target: { value } }) => WBA.setShortDescription(value),
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
      slots,
      slots: [firstTime],
    } = this.state;
    const {
      city: { cityOrganizer },
      city,
    } = this.props;
    const {
      changeTitle,
      changeLongDescription,
      changeShortDescription,
      changeDate,
    } = this.handlers;

    const lastWord = empty.length ? ce(DontForget, { empty }) : ce(Finished);

    return ce(Form, { className: 'WalkBuilder' },
      ce(Row, { type: 'flex', justify: 'center' },
        ce(Col, Layout.Full,
          ce(Welcome, { name: t`Save the Date!`, cityOrganizer, title, firstTime, changeTitle, changeDate })
        )
      ),
      ce(Navigator, { menuOptions },
        ce(WalkDetails, {
          name: t`Describe Your Walk`,
          title,
          longDescription,
          shortDescription,
          changeTitle,
          changeLongDescription,
          changeShortDescription,
        }),
        ce(Theme, { name: t`Themes` }),
        ce(RouteBuilder, { name: t`Share Your Route`, city }),
        ce(AddDates, { name: t`Set the Date` }),
        ce(Accessibility, { name: t`Accessibility` }),
        ce(Team, { name: t`Create Your Team` }),
        lastWord,
      )
    );
  }
}
