/**
 * TextArea
 *
 * Expandable area, with optional limits on length.
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
const { createElement: ce } = React;

const TextArea = ({ maxlength, value = '' }) => (
  ce('textarea', { maxlength, value })
);

export default TextArea;
