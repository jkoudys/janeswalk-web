/**
 * DatePicker
 * A simple, texty-looking date picker
 */
/* global React */
// import { TransitionView, DateField, DatePicker as DP } from 'react-date-picker';

import { DatePicker as DP } from 'antd';
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { createElement as ce } from 'react';

const DatePicker = () => (
  ce(DP, {
    format: 'LL HH:mm',
  })
);

export default DatePicker;
