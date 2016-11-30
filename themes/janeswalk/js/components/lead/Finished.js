/**
 * Finished
 *
 * The "You're all done!" page
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { createElement as ce } from 'react';

const Finished = () => (
  ce('section', { className: 'Lead__Finished' },
    ce('h1', {}, t`That's everything.`),
    ce('h2', {}, t`You're all set.`),
    ce('button', {}, t`Publish Walk`),
    ce('p', {},
      'Or ', ce('a', {}, t`Preview`),
    ),
  )
);

export default Finished;
