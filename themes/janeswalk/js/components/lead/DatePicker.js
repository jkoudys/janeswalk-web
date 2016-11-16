/**
 * DatePicker
 * A simple, texty-looking date picker
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
const { createElement: ce } = React;

const DatePicker = () => ce('div', {}, t`Date picker`);

export default DatePicker;
