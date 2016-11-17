/**
 * FieldSet
 * A group of options, to highlight as the active ones.
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
const { createElement: ce } = React;

const FieldSet = ({ children }) => (
  ce('fieldset', {}, children)
);

export default FieldSet;
