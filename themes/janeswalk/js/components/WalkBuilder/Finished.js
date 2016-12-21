/**
 * Finished
 *
 * The "You're all done!" page
 */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { createElement as ce } from 'react';
import { Row, Col } from 'antd';
import { Finished as Layout, imgDir } from '../../constants/Layout';

const Finished = () => (
  ce('section', { id: 'finished', className: 'Lead__Finished' },
    ce(Row, Layout.Main,
      ce(Col, Layout.Content,
        ce('img', { src: `${imgDir}/clipboard.svg`, style: { width: '26%', align: 'center' } }),
        ce('h1', {}, t`That's everything.`),
        ce('h2', {}, t`You're all set.`),
        ce('button', {}, t`Publish Walk`),
        ce('p', {},
          'Or ', ce('a', {}, t`Preview`),
        )
      )
    ),
  )
);

export default Finished;
