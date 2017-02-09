/**
 * Welcome
 *
 * A nice message.
 */
import { createElement as ce } from 'react';
import jump from 'jump.js';
import t from 'es2015-i18n-tag';
import { Input, DatePicker, Icon, Button, Row, Col } from 'antd';

import { Welcome as Layout } from '../../constants/Layout';
import { dateOptions } from './AddDates';

const techEmail = 'tech@janeswalk.org';

const jumpNext = () => jump('#menuOptions0');

const Welcome = ({ name, title, time, handlers }) => (
  ce('section', { className: 'Lead__Welcome' },
    ce(Row, Layout.Main,
      ce(Col),
      ce(Col, Layout.Content,
        ce('h1', {}, name),
        ce('p', {}, t`Start by picking a name and meeting time for your Walk.`),
        ce('div', {},
          ce(Input, { placeholder: t`The name of my walk`, value: title, onChange: handlers.title }),
          ce(DatePicker, {
            ...dateOptions,
            style: { marginTop: '12px' },
            value: time,
            onChange: handlers.times(time),
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
        t`If you're having technical problems setting up your walk, reach out to our Project Office at `,
        ce('a', { href: `mailto:${techEmail}` }, techEmail)
      ),
    )
  )
);

export default Welcome;
