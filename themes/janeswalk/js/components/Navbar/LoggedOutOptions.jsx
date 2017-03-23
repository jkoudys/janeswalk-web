/* global $ */
import { t, tc } from 'janeswalk/stores/I18nStore';
import { createElement as ce } from 'react';

export default ({ searching, toggleSearch }) => [
  ce('li', { key: 'nav2' },
    ce('a', { href: '/register' }, tc('Register on a website', 'Join')),
  ),
  ce('li', { key: 'nav3' },
    ce('a', { onClick: () => $('#login').modal() }, t('Log in')),
  ),
];
