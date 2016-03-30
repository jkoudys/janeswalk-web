/**
 * Array-builder of menu options. note: not a component, since there isn't a root element,
 * but an array of components.
 */
/* global React */
import { t } from 'janeswalk/stores/I18nStore';

/* Build menu options depending if currently logged in or not */
export default ({ user, profiling, searching, toggleProfile, toggleSearch, unseenUpdates }) => [
  <li>
    <a onClick={toggleSearch} className={searching ? 'selected' : ''}>
      <i className="fa fa-search" />
    </a>
  </li>,
  <li className={unseenUpdates ? 'notify' : ''}>
    <a href="#" onClick={toggleProfile} className={profiling ? 'selected' : ''}>
      <i className="fa fa-calendar" />
    </a>
  </li>,
  <li>
    <a href="/profile">{user.firstName || user.name}</a>
  </li>,
  <li>
    <a href="/login/logout">{t('Logout')}</a>
  </li>,
];
