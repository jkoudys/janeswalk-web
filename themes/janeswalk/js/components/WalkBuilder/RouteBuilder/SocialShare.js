/**
 * SocialShare
 *
 * Share options for social networks, e.g. twitter, instagram, soundcloud.
 */

import { createElement as ce } from 'react';
import { Button, Form, Tooltip } from 'antd';
import { translateTag as t } from 'janeswalk/stores/I18nStore';

export default () => ce(Form.Item, { style: { marginBottom: '0.5em' } },
  ce(Tooltip, { title: t`Coming soon!` },
    ce(Button, { disabled: true }, ce('i', { className: 'fa fa-soundcloud' }), ' Soundcloud'),
    ce(Button, { disabled: true }, ce('i', { className: 'fa fa-twitter' }), ' Twitter'),
    ce(Button, { disabled: true }, ce('i', { className: 'fa fa-instagram' }), ' Instagram')
  )
);
