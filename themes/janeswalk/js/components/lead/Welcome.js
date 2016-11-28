/**
 * Welcome
 *
 * A nice message.
 */

import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { Input, DatePicker } from 'antd';

import { createElement as ce } from 'react';

const techEmail = 'tech@janeswalk.org';

const Welcome = ({ name, cityOrganizer: { firstName, lastName, email }, title, handleChangeTitle, date, handleChangeDate }) => (
  ce('section', {},
    ce('h1', {}, name),
    ce('p', {}, t`Start by picking a name and meeting time for your Walk.`),
    ce('div', {},
      ce(Input, { placeholder: t`The name of my walk`, value: title, onChange: handleChangeTitle }),
      ce(DatePicker, { format: 'LL', date, handleChangeDate })
    ),
    ce('p', {},
      t`Feel free to email organizer ${`${firstName} ${lastName}`.trim()} if you have any questions! `,
      '(', ce('a', { href: `mailto:${email}` }, email), ')'
    ),
    ce('p', {},
      t`If you're having technical problems setting up your walk, reach out to us at `,
      ce('a', { href: `mailto:${techEmail}` }, techEmail)
    )
  )
);

export default Welcome;
