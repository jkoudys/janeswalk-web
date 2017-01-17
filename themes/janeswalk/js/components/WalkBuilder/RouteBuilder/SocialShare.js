/**
 * SocialShare
 *
 * Share options for social networks, e.g. twitter, instagram, soundcloud.
 */

import { createElement as ce } from 'react';
import { Button, Form, Tooltip } from 'antd';
import t from 'es2015-i18n-tag';

export default () => ce(Form.Item, { style: { marginBottom: '0.5em' } },
  ce(Tooltip, { title: t`Coming soon!` },
    ce(Button, { disabled: true }, ce('i', { className: 'fa fa-soundcloud' }), ' Soundcloud'),
    ce(Button, { disabled: true }, ce('i', { className: 'fa fa-twitter' }), ' Twitter'),
    ce(Button, { disabled: true }, ce('i', { className: 'fa fa-instagram' }), ' Instagram')
  )
);
