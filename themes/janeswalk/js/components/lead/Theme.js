/**
 * Theme
 *
 * The themes the Walk will have
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { createElement as ce } from 'react';

const Theme = ({ id, name, order }) => (
  ce('section', { id },
    ce('h1', {}, name),
    ce('h2', {}, t`Choose up to ${3}`)
  )
);

export default Theme;
