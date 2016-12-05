/**
 * RouteBuilder
 *
 * Make a map!
 */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { createElement as ce } from 'react';
import { Form } from 'antd';
import SocialShare from './SocialShare';
import RouteMap from './RouteMap';

const RouteBuilder = ({ id, name, city }) => (
  ce('section', { id, className: 'Lead__Option' },
    ce('h1', {}, name),
    ce(Form.Item, {},
      ce(SocialShare),
    ),
    ce(RouteMap, { city }),
  )
);

export default RouteBuilder;
