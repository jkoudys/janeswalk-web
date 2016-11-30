/**
 * RouteBuilder
 *
 * Make a map!
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { createElement as ce } from 'react';

const RouteBuilder = ({ id, name }) => (
  ce('section', { id, className: 'Lead__Option' },
    ce('h1', {}, name),
    ce('h2', {}, t`[Route Builder]`)
  )
);

export default RouteBuilder;
