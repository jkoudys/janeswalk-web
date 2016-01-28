import Itinerary from './itinerary/Itinerary.jsx';
import AreaStore from '../stores/AreaStore.js';
import UserStore from '../stores/UserStore.js';

// TODO: Replace translations placeholders
const t = s => s;
const tc = (c, s) => s;

/* Build menu options depending if currently logged in or not */
const LoggedInOptions = ({user, profiling, searching, toggleProfile, toggleSearch}) => ([
  <li>
    <a onClick={toggleSearch} className={searching ? 'selected' : ''}>
      <i className="fa fa-search" />
    </a>
  </li>,
  <li>
    <a onClick={toggleProfile} className={profiling ? 'selected' : ''}>
      <i className="fa fa-calendar" />
    </a>
  </li>,
  <li>
    <a href="/profile">{user.firstName || user.name}</a>
  </li>,
  <li>
    <a href="/login/logout">{t('Logout')}</a>
  </li>
]);

const LoggedOutOptions = ({searching, toggleSearch}) => ([
  <li>
    <a onClick={toggleSearch} className={searching ? 'selected' : ''}>
      <i className="fa fa-search" />
    </a>
  </li>,
  <li>
    <a href="/register">{tc('Register on a website', 'Join')}</a>
  </li>,
  <li>
    <a onClick={() => $('#login').modal()}>{t('Log in')}</a>
  </li>
]);

function getNavbar() {
  return {
    options: AreaStore.getArea('Left Header'),
    dropdown: AreaStore.getArea('Dropdown'),
    user: UserStore.getUser()
  };
}

/**
 * Parse out some HTML, and add the built element after the ref
 */
function appendSiblings(html, refNode) {
  const div = document.createElement('div');
  div.innerHTML = html;

  [].forEach.call(div.children, child => refNode.parentNode.appendChild(child));
}

/**
 * Make the navbar sticky to the top
 */
function makeSticky(reference, el) {
  let running = false;
  // Where the el is when unfixed
  let unfixed = reference.offsetTop;
  const stick = () => {
    if (running) return;
    running = true;
    requestAnimationFrame(() => {
      running = false;
      // TODO: remove this 60 hardcoding of the header height
      if (window.scrollY > unfixed - 60) {
        el.classList.add('fixed');
      } else {
        el.classList.remove('fixed');
      }
    });
  };
  window.addEventListener('scroll', stick);
  window.addEventListener('resize', () => {unfixed = reference.offsetTop; stick()});
}

// The header menu
export default class Navbar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = getNavbar()
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    AreaStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AreaStore.removeChangeListener(this._onChage);
    UserStore.removeChangeListener(this._onChage);
  }

  _onChange() {
    this.setState(getNavbar());
  }

  componentDidMount() {
    appendSiblings(this.state.options, this.refs.topnav);
    makeSticky(React.findDOMNode(this), this.refs.header);
  }

  /**
   * Need to check if the HTML has updated, so we don't rebuild the DOM
   */
  componentWillUpdate(nextProps, {options, dropdown}) {
    if (options !== this.state.options) {
      appendSiblings(options, this.refs.topnav);
    }
  }

  /**
   * _addNavEvents
   *
   * @protected
   * @return    void
   */
  _addNavEvents() {
    this._element.find('a.search-open').click(function() {
      $('body > header').addClass('dropped');

    });
    this._element.find('a.search-close').click(function() {
      $('body > header').removeClass('dropped');
    });
  }

  openSearch() {
      $('html, body').animate({
        scrollTop: 0
      }, 300);
  }

  componentWillUpdate(_, {searching}) {
    // See if we're opening the search
    if (!this.state.searching && searching) {
      this.openSearch();
    }
  }

  render() {
    const {editMode} = this.props;
    const {user, searching, profiling} = this.state;
    let userOptions;
    const defaultOptions = {
      searching: searching,
      toggleSearch: () => this.setState({searching: !this.state.searching})
    };

    // Build the logged in vs logged out
    if (user) {
      userOptions = LoggedInOptions(Object.assign({
        user: user,
        profiling: profiling,
        toggleProfile: () => this.setState({profiling: !this.state.profiling}),
      }, defaultOptions));
    } else {
      userOptions = LoggedOutOptions(defaultOptions);
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
          <div className="navbar-outer" dangerouslySetInnerHTML={{__html: this.state.dropdown}} />
        </header>
        <div id="modals">
          {profiling ? <Itinerary onClose={() => this.setState({profiling: !this.state.profiling})} /> : null}
        </div>
      </div>
    );
  }
}

Navbar.defaultProps = {
  editMode: CCM_EDIT_MODE
}
