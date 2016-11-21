/**
 * DatePicker
 * A simple, texty-looking date picker
 */
/* global React */
import { TransitionView, DateField, DatePicker as DP } from 'react-date-picker';

import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { createElement as ce } from 'react';

import 'react-date-picker/index.css';

const DatePicker = () => (
  ce(DateField, { dateFormat: 'LL HH:mm', updateOnDateClick: true, defaultValue: '' },
    ce(TransitionView, {},
      ce(DP, {
        navigation: true,
        locale: 'en',
        forceValidDate: true,
        highlightWeekends: true,
        highlightToday: true,
        weekNumbers: true,
        weekStartDay: 0,
      })
    )
  )
);

export default DatePicker;
