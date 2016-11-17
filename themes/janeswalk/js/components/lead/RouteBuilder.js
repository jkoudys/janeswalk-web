/**
 * RouteBuilder
 *
 * Make a map!
 */
/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const { createElement: ce } = React;

const RouteBuilder = ({ order }) => (
  ce('section', {},
    ce('h1', {}, `${order}. `, t`Share Your Route`),
    ce('h2', {}, t`Choose up to ${3}`)
  )
);

export default RouteBuilder;
