/* global React ReactDOM $ CCM_EDIT_MODE */
import Itinerary from './itinerary/Itinerary.jsx';
import AreaStore from 'janeswalk/stores/AreaStore';
import UserStore from 'janeswalk/stores/UserStore';
import ItineraryStore from 'janeswalk/stores/ItineraryStore';
import { makeSticky } from 'janeswalk/utils/dom';

import loggedInOptions from './Navbar/LoggedInOptions.jsx';
import loggedOutOptions from './Navbar/LoggedOutOptions.jsx';

function getNavbar() {
  return {
    options: AreaStore.getArea('Left Header'),
    dropdown: AreaStore.getArea('Dropdown'),
    user: UserStore.getCurrent(),
    itinerary: ItineraryStore.getLists(),
    totalWalks: ItineraryStore.totalWalks(),
  };
}

/**
 * Parse out some HTML, and add the built element after the ref
 */
function appendSiblings(html, refNode) {
  const div = document.createElement('div');
  div.innerHTML = html;

  for (const child of div.children) refNode.parentNode.appendChild(child);
}

// The header menu
export default class Navbar extends React.Component {
  constructor(...args) {
    super(...args);

    Object.assign(this, {
      state: {
        lastSize: ItineraryStore.totalWalks(),
        ...getNavbar(),
      },
      _onChange: () => this.setState(getNavbar),
    });
  }

  componentWillMount() {
    AreaStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  }

  componentDidMount() {
    appendSiblings(this.state.options, this.refs.topnav);
    makeSticky(ReactDOM.findDOMNode(this), this.refs.header);
  }

  /**
   * Need to check if the HTML has updated, so we don't rebuild the DOM
   */
  componentWillUpdate(nextProps, { options, searching }) {
    if (options && options !== this.state.options) {
      appendSiblings(options, this.refs.topnav);
    }

    // See if we're opening the search
    if (!this.state.searching && searching) {
      this.openSearch();
    }
  }

  componentWillUnmount() {
    AreaStore.removeChangeListener(this._onChage);
    UserStore.removeChangeListener(this._onChage);
  }

  openSearch() {
    $('html, body').animate({
      scrollTop: 0,
    }, 300);
  }

  render() {
    const { editMode } = this.props;
    const { user, searching, profiling, totalWalks } = this.state;
    let userOptions;
    const defaultOptions = {
      searching,
      toggleSearch: () => this.setState({ searching: !this.state.searching }),
    };

    // Build the logged in vs logged out
    if (user) {
      userOptions = loggedInOptions({
        ...defaultOptions,
        unseenUpdates: this.state.lastSize !== totalWalks,
        toggleProfile: () => this.setState({ profiling: !this.state.profiling, lastSize: totalWalks }),
        user,
        profiling,
      });
    } else {
      userOptions = loggedOutOptions(defaultOptions);
    }

    return (
      <div>
        <header ref="header" className={[editMode ? 'edit' : '', searching ? 'dropped' : ''].join(' ')}>
          <nav role="navigation">
            <a href="/" className="logo">
              <span />
            </a>
            <ul className="nav" ref="topnav">
              {userOptions}
              <li>
                <a href="/donate" id="donate">Donate</a>
              </li>
            </ul>
          </nav>
          <div className="navbar-outer" dangerouslySetInnerHTML={{ __html: this.state.dropdown }} />
        </header>
        <div id="modals">
          {profiling ? <Itinerary onClose={() => this.setState({ profiling: !this.state.profiling })} /> : null}
        </div>
      </div>
    );
  }
}

Navbar.defaultProps = {
  editMode: CCM_EDIT_MODE,
};
