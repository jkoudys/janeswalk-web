/**
 * DontForget
 *
 * Wait a minute, you missed something! Still want to save?
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { createElement as ce } from 'react';
import { Icon, Button, Row, Col } from 'antd';
import { Finished as Layout, imgDir } from '../../constants/Layout';

const DontForget = ({ saving, empty = [], handlers: { saveWalk } }) => (
  ce('section', { id: 'finish', className: 'Lead__Finished Lead__Forget' },
    ce(Row, Layout.Main,
      ce(Col, Layout.Content,
        ce('img', { src: `${imgDir}/flag.svg`, style: { width: '26%', align: 'center' } }),
        ce('h1', {}, t`Looks like there are a few things your Walk is missing.`),
        ce('ul', {}, empty.map(missing => ce('li', { key: `missing${missing}` }, missing))),
        ce('p', {},
          ce('a', {}, t`Preview`),
          ' or ',
          ce(Button, { onClick: saveWalk },
            saving ? ce(Icon, { type: 'loading' }) : '',
            saving ? t`Saving...` : t`Save Walk`
          )
        ),
      )
    )
  )
);

export default DontForget;
