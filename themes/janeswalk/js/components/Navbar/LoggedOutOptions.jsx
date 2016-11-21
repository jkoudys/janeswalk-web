/* global $ */
import { t, tc } from 'janeswalk/stores/I18nStore';
import React from 'react';

export default ({ searching, toggleSearch }) => [
  <li key="nav2">
    <a href="/register">{tc('Register on a website', 'Join')}</a>
  </li>,
  <li key="nav3">
    <a onClick={() => $('#login').modal()}>{t('Log in')}</a>
  </li>,
];
