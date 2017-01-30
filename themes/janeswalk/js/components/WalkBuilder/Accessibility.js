/**
 * Accessibility
 *
 * The folks who make it happen. The team putting this Walk on.
 */
import { createElement as ce } from 'react';
import { Form, Row, Col, Tag } from 'antd';
import t from 'es2015-i18n-tag';
import { keyboard as kbJump } from 'janeswalk/utils/jumpers';
import { icons as AccessibleIcons } from 'janeswalk/utils/lookups/Accessible';
import TextArea from './TextArea';

const Accessibility = ({ name, id, accessibles, accessibleInfo, accessibleTransit, accessibleFind, handlers }) => (
  ce('section', { id, className: 'Lead__Option' },
    ce('h1', {}, name),
    ce(Form.Item, {
      label: t`What can you tell people about the accessibility of this Walk?`,
    },
      ce(Row, {},
        Object.entries(AccessibleIcons).map(([key, { name, icon }]) => {
          const handler = handlers.accessibles(key);
          const checked = accessibles.has(key);

          return ce(Col, {
            key: `theme${key}`,
            xs: 8,
            sm: 8,
            md: 6,
          },
            ce(Tag.CheckableTag, {
              key,
              checked,
              onChange: checked ? handler.remove : handler,
            },
            ce('i', { className: `fa fa-${icon}` }),
            t([name])
          ));
        }),
      ),
      ce('p', {}, t`Remember to come back and update this section after you've practiced going on your Walk. We encourage trying to eliminate barriers where you can, especially around mobility.`)
    ),
    ce(Form.Item, {
      label: t`Extra info`,
    },
      ce(TextArea, {
        addonBefore: ce('i', { className: 'fa fa-align-left' }),
        maxLength: 150,
        value: accessibleInfo,
        onKeyPress: kbJump,
        onChange: handlers.accessibleInfo,
      }),
      accessibles.size > 0 ? ce('p', {},
        t`Why did you describe this walk as having: `,
        accessibles.map((key) => t(AccessibleIcons[key].name.toLowerCase())).join(', '),
        '?'
      ) : null
    ),
    ce(Form.Item, {
      label: t`How will people find you?`,
    },
      ce(TextArea, {
        addonBefore: ce('i', { className: 'fa fa-align-left' }),
        maxLength: 300,
        value: accessibleFind,
        onKeyPress: kbJump,
        onChange: handlers.accessibleFind,
      }),
      ce('p', {}, t`Perhaps you will be holding a sign, wearing a special t-shirt, or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.`)
    ),
    ce(Form.Item, {
      label: t`How can people get to the meeting spot by public transit?` + ` (${t`Optional`})`,
    },
      ce(TextArea, {
        addonBefore: ce('i', { className: 'fa fa-align-left' }),
        maxLength: 300,
        value: accessibleTransit,
        onKeyPress: kbJump,
        onChange: handlers.accessibleTransit,
      }),
      ce('p', {}, t`Perhaps you will be holding a sign, wearing a special t-shirt, or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.`)
    )
  )
);

export default Accessibility;
