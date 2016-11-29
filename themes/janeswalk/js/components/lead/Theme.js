/**
 * Theme
 *
 * The themes the Walk will have
 */
/* global React */
import { t as trans, translateTag as t } from 'janeswalk/stores/I18nStore';
import { icons as themeIcons } from 'janeswalk/utils/lookups/Theme';

import { createElement as ce } from 'react';
import { Row, Col, Form, Tag } from 'antd';

const Theme = ({ id, name, order }) => (
  ce('section', { id },
    ce('h1', {}, name),
    ce('h2', {}, t`Choose up to ${3}`),
    ce(Row, {},
      ce(Form.Item, {}, Object.entries(themeIcons).map(([key, { name, icon }]) => ce(Col, {
        xs: 8,
        md: 6,
        lg: 4,
      }, ce(Tag.CheckableTag, { key },
          ce('i', { className: `fa fa-${icon}` }),
          trans(name)
        )
      )))
    )
  )
);

export default Theme;
