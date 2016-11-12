/**
 * Walk Builder
 *
 * The main walk builder itself. The component for building a walk!
 */
/* global React */

import Welcome from './Welcome';

const { createElement: ce, Component } = React;
const { create, assign } = Object;


class WalkBuilder extends Component {
  constructor(props) {
    super(props);
    assign(this, {
      state: {},
    });
  }

  render() {
    const {
      cityOrganizer
    } = this.state;

    return ce('main', {},
      ce(Welcome, { cityOrganizer }),
      ce(Navigator, {},
        ce(SaveTheDate),
        ce(WalkDetails),
        ce(Theme),
        ce(Route),
        ce(AddDates),
        ce(Accessibility),
        ce(Team),
      ),
      ce(Finished)
    );
  }
}
