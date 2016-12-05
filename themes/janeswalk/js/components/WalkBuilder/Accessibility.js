/**
 * Accessibility
 *
 * The folks who make it happen. The team putting this Walk on.
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import FieldSet from './FieldSet';
import TextArea from './TextArea';

import { createElement as ce } from 'react';

const Accessibility = ({ order }) => (
  ce('section', {},
    ce('h1', {}, `${order}. `, t`Make it Accessible`),
    ce('div', {}, 'XXX Grid picker with images'),
    ce(FieldSet, {},
      ce('label', {}, t`How will people find you?`),
      ce(TextArea, { maxlength: 150 }),
      ce('p', {}, t`Perhaps you will be holding a sign, wearing a special t-shirt, or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.`)
    ),
    ce(FieldSet, {},
      ce('label', {}, t`How can people get to the meeting spot by public transit?`, t` (Optional)`),
      ce(TextArea, { maxlength: 150 }),
      ce('p', {}, t`Perhaps you will be holding a sign, wearing a special t-shirt, or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.`)
    )

  )
);

export default Accessibility;
