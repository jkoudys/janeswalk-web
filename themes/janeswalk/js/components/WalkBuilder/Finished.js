/**
 * Finished
 *
 * The "You're all done!" page
 */
import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';
import { Icon, Button, Row, Col } from 'antd';
import { Finished as Layout, imgDir } from '../../constants/Layout';

const Finished = ({ publishing = false, handlers: { publishWalk, preview } }) => (
  ce('section', { id: 'finish', className: 'Lead__Finished' },
    ce(Row, Layout.Main,
      ce(Col, Layout.Content,
        ce('img', { src: `${imgDir}/clipboard.svg`, style: { width: '26%', align: 'center' } }),
        ce('h1', {}, t`That's everything.`),
        ce('h2', {}, t`You're all set.`),
        ce(Button, { onClick: publishWalk },
           publishing ? ce(Icon, { type: 'loading' }) : '',
           publishing ? t`Publishing...` : t`Publish Walk`
        ),
        ce('p', { style: { marginTop: '10px' } },
          'Or ', ce(Button, { onClick: preview }, t`Preview`),
        )
      )
    ),
  )
);

export default Finished;
