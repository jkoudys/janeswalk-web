/**
 * Walk Builder
 *
 * The main walk builder itself. The component for building a walk!
 */
/* global React */

import I18nStore, { translateTag as t } from 'janeswalk/stores/I18nStore';
import WalkBuilderStore from 'janeswalk/stores/WalkBuilderStore';

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

const { createElement: ce, Component } = React;
const { create, assign } = Object;

const buildState = () => ({
  ...WalkBuilderStore.getAsSchema(),
  empty: WalkBuilderStore.getEmptyRequiredFields()
});

export default class WalkBuilder extends Component {
  constructor(props) {
    super(props);
    assign(this, {
      state: { menuOptions: [], ...buildState() },
      onChange: () => this.setState(buildState),
      menuOptions: [],
      addToMenu: ({ node, title }) => this.menuOptions.push({ node, title }),
    });
  }

  componentWillMount() {
    I18nStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    this.setState({ menuOptions: this.menuOptions });
  }

  componentWillUnmount() {
    I18nStore.removeChangeListener(this.onChange);
  }

  render() {
    const {
      menuOptions,
      empty,
    } = this.state;
    const {
      city: { cityOrganizer },
    } = this.props;

    const lastWord = empty.length ? ce(DontForget, { empty }) : ce(Finished);

    return ce('main', {},
      ce(Welcome, { cityOrganizer }),
      ce(Navigator, { menuOptions },
        ce(SaveTheDate, { ref: node => this.addToMenu({ title: t`Save the Date`, node }) }),
        ce(WalkDetails, { ref: node => this.addToMenu({ title: t`Walk Details`, node }) }),
        ce(Theme, { ref: node => this.addToMenu({ title: t`Theme`, node }) }),
        ce(RouteBuilder, { ref: node => this.addToMenu({ title: t`Route`, node }) }),
        ce(AddDates, { ref: node => this.addToMenu({ title: t`Add Dates`, node }) }),
        ce(Accessibility, { ref: node => this.addToMenu({ title: t`Accessibility`, node }) }),
        ce(Team, { ref: node => this.addToMenu({ title: t`Team`, node }) }),
      ),
      lastWord
    );
  }
}
