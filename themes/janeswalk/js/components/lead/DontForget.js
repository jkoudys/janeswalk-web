/**
 * DontForget
 *
 * Wait a minute, you missed something! Still want to save?
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';

import { createElement as ce } from 'react';

const DontForget = ({ empty = [] }) => (
  ce('section', { id: 'finish' },
    ce('h1', {}, t`Looks like there are a few things your Walk is missing:`),
    ce('ul', {}, empty.map(missing => ce('li', { key: `missing${missing}` }, missing))),
    ce('p', {},
      ce('a', {}, t`Preview`), ' or ', ce('a', {}, t`Save`)
    )
  )
);

export default DontForget;
