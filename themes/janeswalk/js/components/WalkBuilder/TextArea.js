/**
 * TextArea
 *
 * Expandable area, with optional limits on length.
 */
import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

import { Input } from 'antd';

const TextArea = ({ maxLength, value = '', ...props }) => (
  ce('div', { className: 'TextArea' },
    ce(Input, { type: 'textarea', maxLength, value, ...props }),
    ce('span', { className: 'TextArea__count' }, maxLength - (value || '').length)
  )
);

export default TextArea;
