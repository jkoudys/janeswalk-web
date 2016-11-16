/**
 * Navigator
 * The main view of lead a walk content. For -full-screening and making a sticky menu of the current position
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const { createElement: ce, cloneElement: cln, Component } = React;

export default class Navigator extends Component {
  constructor(props) {
    super(props);

    Object.assign(this, {
      state: {
      },
    });
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      ce('section', { className: 'Navigator' },
        ce('nav', {},
          ce('ul', { className: 'Navigator__pageoptions' },
          )
        ),
        children.map((child, i) => cln(child, { key: `menuOption${i}`, order: i + 1 }))
      )
    );
  }
}
