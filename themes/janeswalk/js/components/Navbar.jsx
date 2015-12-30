import Itinerary from './itinerary/Itinerary.jsx';
import AreaStore from '../stores/AreaStore.js';
import UserStore from '../stores/UserStore.js';

// TODO: Replace translations placeholders
const t = s => s;
const tc = (c, s) => s;

/* Build menu options depending if currently logged in or not */
const LoggedInOptions = ({user, profiling, toggleProfile}) => ([
  <li>
    <a onClick={toggleProfile}>{user.firstName || user.name} &nbsp;<i className="fa fa-caret-down" style={{transitionDuration: '0.2s', transform: 'rotate(' + (profiling ? -180 : 0) + 'deg)'}} /></a>
  </li>,
  <li>
    <a href="/login/logout">{tc('Register on a website', 'Join')}</a>
  </li>
]);

const LoggedOutOptions = () => ([
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

      // If there's a text-field in the drop, move caret to it
      const textInput = document.querySelector('body > header input[type=text]');
      if (textInput) {
        textInput.focus();
      }

      this.setState({searching: true});
  }

  render() {
    const {editMode} = this.props;
    const {user, searching, profiling} = this.state;

    return (
      <header className={[editMode ? 'edit' : '', searching ? 'dropped' : ''].join(' ')}>
        <nav role="navigation">
          <a href="/" className="logo">
            <span />
          </a>
          <ul className="nav" ref="topnav">
            <li>
              <a className="search-open" onClick={() => this.openSearch()}>
                <i className="fa fa-search" />
              </a>
              <a className="search-close" onClick={() => this.setState({searching: false})}>
                <i className="fa fa-search" />
              </a>
            </li>
            {user ? LoggedInOptions({user: user, profiling: profiling, toggleProfile: () => this.setState({profiling: !this.state.profiling})}) : LoggedOutOptions()}
            <li>
              <a href="/donate" id="donate">Donate</a>
            </li>
          </ul>
        </nav>
        <div className="navbar-outer" dangerouslySetInnerHTML={{__html: this.state.dropdown}} />
        {profiling ? <Itinerary /> : null}
      </header>
    );
  }
}

Navbar.defaultProps = {
  editMode: CCM_EDIT_MODE
}
