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

const Theme = ({ id, name, themes, handlers }) => {
  const atLimit = themes.size >= 3;

  return (
    ce('section', { id, className: 'Lead__Option' },
      ce('h1', {}, name),
      ce(Row, {},
        ce(Form.Item, {
          label: t`Choose up to ${3}`,
        }, Object.entries(themeIcons).map(([key, { name, icon }]) => {
          const handler = handlers.themes(key);
          const checked = themes.has(key);
          let style;
          let onChange;

          if (atLimit && !checked) style = { opacity: '0.6' };

          if (checked) onChange = handler.remove;
          else if (!atLimit) onChange = handler;

          return (
            ce(Col, {
              key: `theme${key}`,
              xs: 8,
              sm: 6,
              md: 4,
            },
              ce(Tag.CheckableTag, {
                key,
                checked,
                onChange,
                style,
              },
                ce('i', { className: `fa fa-${icon}` }), trans(name)
              )
            )
          );
        }))
      )
    )
  );
};

export default Theme;
