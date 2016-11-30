/**
 * Accessibility
 *
 * The folks who make it happen. The team putting this Walk on.
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import TextArea from './TextArea';

import { createElement as ce } from 'react';
import { Form } from 'antd';

const Accessibility = ({ name, id }) => (
  ce('section', { id, className: 'Lead__Option' },
    ce('h1', {}, name),
    ce('div', {}, 'XXX Grid picker with images'),
    ce(Form.Item, {
      label: t`How will people find you?`,
    },
      ce(TextArea, {
        addonBefore: ce('i', { className: 'fa fa-align-left' }),
        maxLength: 150,
      }),
      ce('p', {}, t`Perhaps you will be holding a sign, wearing a special t-shirt, or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.`)
    ),
    ce(Form.Item, {
      label: t`How can people get to the meeting spot by public transit?` + ` (${t`Optional`})`
    },
      ce(TextArea, {
        addonBefore: ce('i', { className: 'fa fa-align-left' }),
        maxLength: 150,
      }),
      ce('p', {}, t`Perhaps you will be holding a sign, wearing a special t-shirt, or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.`)
    )
  )
);

export default Accessibility;
