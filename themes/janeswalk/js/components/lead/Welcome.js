/**
 * Welcome
 *
 * A nice message.
 */
/* global React */

import { translateTag as t } from 'janeswalk/stores/I18nStore';

const { createElement: ce } = React;

const techEmail = 'tech@janeswalk.org';

const Welcome = ({ cityOrganizer: { firstName, lastName, email } }) => (
  ce('section', {},
    ce('h1', {}, t`Lead a Jane's Walk`),
    ce('h2', {}, t`It's going to be great.`),
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
