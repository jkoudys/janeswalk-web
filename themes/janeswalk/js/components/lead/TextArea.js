/**
 * TextArea
 *
 * Expandable area, with optional limits on length.
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { createElement as ce } from 'react';

import { Input } from 'antd';

const TextArea = ({ maxLength, value = '', ...props }) => (
  ce('div', {},
    ce(Input, { type: 'textarea', maxLength, value, ...props }),
    ce('span', {}, maxLength - value.length)
  )
);

export default TextArea;
