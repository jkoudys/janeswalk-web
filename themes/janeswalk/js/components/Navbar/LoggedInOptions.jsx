/**
 * Array-builder of menu options. note: not a component, since there isn't a root element,
 * but an array of components.
 */
import t from 'es2015-i18n-tag';
import { createElement as ce } from 'react';

/* Build menu options depending if currently logged in or not */
export default ({ user, profiling, searching, toggleProfile, toggleSearch, unseenUpdates }) => [
  ce('li', { key: 'nav2', className: unseenUpdates ? 'notify' : '' },
    ce('a', { href: '#', onClick: toggleProfile, className: profiling ? 'selected' : '' },
      ce('i', { className: 'fa fa-calendar' }),
    ),
  ),
  ce('li', { key: 'nav3' },
    ce('a', { href: '/profile' }, user.firstName || user.name ),
  ),
  ce('li', { key: 'nav4' },
    ce('a', { href: '/login/logout' }, t`Logout`),
  ),
];
