/**
 * TextArea
 *
 * Expandable area, with optional limits on length.
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { createElement as ce } from 'react';

const TextArea = ({ maxLength, value = '' }) => (
  ce('div', {},
    ce('textarea', { maxLength, value }),
    ce('span', {}, maxLength - value.length)
  )
);

export default TextArea;
