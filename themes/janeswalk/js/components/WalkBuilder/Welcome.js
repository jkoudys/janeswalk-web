/**
 * Welcome
 *
 * A nice message.
 */
import { createElement as ce } from 'react';
import jump from 'jump.js';
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { Input, DatePicker, Icon, Button, Row, Col } from 'antd';

import { Welcome as Layout } from '../../constants/Layout';

// Minutes we're allowed to pick
const minutesOff = Array.from({ length: 60 })
.map((e, i) => i + 1)
.filter(e => ![0, 30].includes(e));
const disabledMinutes = () => minutesOff;

const techEmail = 'tech@janeswalk.org';

const jumpNext = () => jump('#menuOptions0');

const Welcome = ({ name, cityOrganizer: { firstName, lastName, email }, title, time, handlers }) => (
  ce('section', { className: 'Lead__Welcome' },
    ce(Row, Layout.Main,
      ce(Col),
      ce(Col, Layout.Content,
        ce('h1', {}, name),
        ce('p', {}, t`Start by picking a name and meeting time for your Walk.`),
        ce('div', {},
          ce(Input, { placeholder: t`The name of my walk`, value: title, onChange: handlers.title }),
          ce(DatePicker, {
            format: 'LL, HH:mm',
            style: { marginTop: '12px' },
            showTime: {
              disabledMinutes,
              format: 'HH:mm',
              hideDisabledOptions: true,
            },
            value: time,
            onChange: handlers.times(0, time),
          })
        ),
        ce(Button, {
          className: (title && time) ? '' : 'fade',
          style: { marginTop: '15px' },
          type: 'primary',
          onClick: jumpNext,
        },
           t`Build Your Walk`,
           ce('br'),
           ce(Icon, { type: 'down' })
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
