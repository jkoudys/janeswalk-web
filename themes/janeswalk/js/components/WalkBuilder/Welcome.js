/**
 * Welcome
 *
 * A nice message.
 */

import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { Input, DatePicker, Row, Col } from 'antd';

import { createElement as ce } from 'react';

import { Welcome as Layout } from '../../constants/Layout';

const techEmail = 'tech@janeswalk.org';

const Welcome = ({ name, cityOrganizer: { firstName, lastName, email }, fields: { title, dates } }) => (
  ce('section', { className: 'Lead__Welcome' },
    ce(Row, Layout.Main,
      ce(Col),
      ce(Col, Layout.Content,
        ce('h1', {}, name),
        ce('p', {}, t`Start by picking a name and meeting time for your Walk.`),
        ce('div', {},
          ce(Input, { placeholder: t`The name of my walk`, ...title() }),
          ce(DatePicker, { format: 'LL', style: { marginTop: '12px' }, ...dates })
        ),
      ),
      ce(Col),
    ),
    ce(Row, { className: 'Lead__Welcome--Foot' },
      ce('p', {},
        t`Feel free to email organizer ${`${firstName} ${lastName}`.trim()} if you have any questions! `,
        '(', ce('a', { href: `mailto:${email}` }, email), ')'
      ),
      ce('p', {},
        t`If you're having technical problems setting up your walk, reach out to us at `,
        ce('a', { href: `mailto:${techEmail}` }, techEmail)
      )
    )
  )
);

export default Welcome;
