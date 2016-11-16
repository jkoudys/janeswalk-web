/**
 * Navigator
 * The main view of lead a walk content. For -full-screening and making a sticky menu of the current position
 */

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
        children.map((child, i) => cln(child, { order: i }))
      )
    );
  }
}
