/**
 * Theme
 *
 * The themes the Walk will have
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const { createElement: ce } = React;

const Theme = ({ order }) => (
  ce('section', {},
    ce('h1', {}, `${order}. `, t`Themes`),
    ce('h2', {}, t`Choose up to ${3}`)
  )
);

export default Theme;
