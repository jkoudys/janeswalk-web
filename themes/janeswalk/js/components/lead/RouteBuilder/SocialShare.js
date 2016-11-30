/**
 * SocialShare
 *
 * Share options for social networks, e.g. twitter, instagram, soundcloud.
 */

import { createElement as ce } from 'react';
import { Button, Form } from 'antd';

export default () => ce(Form.Item, { style: { marginBottom: '1em' } },
  ce(Button, { disabled: true }, ce('i', { className: 'fa fa-soundcloud' }), ' Soundcloud'),
  ce(Button, { disabled: true }, ce('i', { className: 'fa fa-twitter' }), ' Twitter'),
  ce(Button, { disabled: true }, ce('i', { className: 'fa fa-instagram' }), ' Instagram'),
);
