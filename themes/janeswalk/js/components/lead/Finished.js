/**
 * Finished
 *
 * The "You're all done!" page
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const { createElement: ce } = React;

const Finished = () => (
  ce('section', {},
    ce('h1', {}, t`That's everything.`),
    ce('h2', {}, t`You're all set.`),
    ce('button', {}, t`Publish Walk`),
    ce('p', {},
      'Or ', ce('a', {}, t`Preview`), ' or ', ce('a', {}, t`Save`)
    )
  )
);

export default Finished;
