/* global React $ */
import { t, tc } from 'janeswalk/stores/I18nStore';

export default ({ searching, toggleSearch }) => [
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
  </li>,
];
