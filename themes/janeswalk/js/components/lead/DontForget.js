/**
 * DontForget
 *
 * Wait a minute, you missed something! Still want to save?
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const { createElement: ce } = React;

const DontForget = ({ empty = [] }) => (
  ce('section', {},
    ce('h1', {}, t`Looks like there are a few things your Walk is missing:`),
    ce('ul', {}, empty.map(missing => ce('li', {}, missing))),
    ce('p', {},
      ce('a', {}, t`Preview`), ' or ', ce('a', {}, t`Save`)
    )
  )
);

export default DontForget;
