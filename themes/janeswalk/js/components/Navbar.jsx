import { createElement as ce, Component } from 'react';
import ReactDOM from 'react-dom';
import t from 'es2015-i18n-tag';

import AreaStore from 'janeswalk/stores/AreaStore';
import UserStore from 'janeswalk/stores/UserStore';
import ItineraryStore from 'janeswalk/stores/ItineraryStore';
import { makeSticky } from 'janeswalk/utils/dom';

import Itinerary from './itinerary/Itinerary.jsx';

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
export default class Navbar extends Component {
  state = {
    lastSize: ItineraryStore.totalWalks(),
    ...getNavbar(),
  };

  _onChange = () => this.setState(getNavbar);

  handleCloseItinerary = () => this.setState({ profiling: false });
  handleOpenItinerary = () => this.setState({ profiling: true });

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

  render() {
    const { user, searching, profiling, totalWalks } = this.state;
    const { handleCloseItinerary, handleOpenItinerary } = this;
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
        toggleProfile: profiling ? handleCloseItinerary : handleOpenItinerary,
        user,
        profiling,
      });
    } else {
      userOptions = loggedOutOptions(defaultOptions);
    }

    return (
      ce('div', {},
        ce('header', { ref: 'header' },
          ce('nav', { role: 'navigation' },
            ce('a', { href: '/', className: 'logo' }, ce('span')),
            ce('ul', { className: 'nav', ref: 'topnav' },
              userOptions,
              ce('li', {}, ce('a', { href: '/donate', id: 'donate' }, t`Donate`)),
            ),
          ),
          ce('div', { className: 'navbar-outer', dangerouslySetInnerHTML: { __html: this.state.dropdown } }),
        ),
        ce(Itinerary, { onCancel: handleCloseItinerary, visible: profiling }),
      )
    );
  }
}
