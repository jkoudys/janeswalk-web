/**
 * Accessibility
 *
 * The folks who make it happen. The team putting this Walk on.
 */
/* global React */
import { t as trans, translateTag as t } from 'janeswalk/stores/I18nStore';
import TextArea from './TextArea';

import { icons as AccessibleIcons } from 'janeswalk/utils/lookups/Accessible';

import { createElement as ce } from 'react';
import { Form, Row, Col, Tag } from 'antd';

const Accessibility = ({ name, id }) => (
  ce('section', { id, className: 'Lead__Option' },
    ce('h1', {}, name),
    ce(Form.Item, {
        label: t`What can you tell people about the accessibility of this Walk?`,
      },
      ce(Row, {},
        Object.entries(AccessibleIcons).map(([key, { name, icon }]) => ce(Col, {
          key: `theme${key}`,
          xs: 8,
          sm: 8,
          md: 6,
        }, ce(Tag.CheckableTag, { key },
            ce('i', { className: `fa fa-${icon}` }),
            trans(name)
          )
        )),
      ),
      ce('p', {}, t`Remember to come back and update this section after you've practiced going on your Walk. We encourage trying to eliminate barriers where you can, especially around mobility.`)
    ),
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
      label: t`How can people get to the meeting spot by public transit?` + ` (${t`Optional`})`,
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
