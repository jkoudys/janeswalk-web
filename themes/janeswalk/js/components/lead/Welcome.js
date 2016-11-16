/**
 * Welcome
 *
 * A nice message.
 */
/* global React */

import { translateTag as t } from 'janeswalk/stores/I18nStore';
import DatePicker from './DatePicker';

const { createElement: ce } = React;

const techEmail = 'tech@janeswalk.org';

const Welcome = ({ cityOrganizer: { firstName, lastName, email }, date, handleChangeDate }) => (
  ce('section', {},
    ce('h1', {}, t`Save the Date!`),
    ce('div', {},
      ce('input', { type: 'text', placeholder: t`The name of my walk` }),
      ce(DatePicker, { date, handleChangeDate })
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
