/**
 * WalkStops
 *
 * A table showing the stops your Walk will take.
 */
import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';
import { Form, Button, Input } from 'antd';

const WalkStop = ({ title, description, index, handlers }) => (
  ce('tr', { className: 'ant-table-row ant-table-row-level-0' },
    ce('td', {}, ce('strong', {}, String.fromCharCode(65 + index))),
    ce('td', {},
      ce(Form.Item, { label: index === 0 ? t`Meeting place` : undefined },
        ce(Input, {
          value: title,
          placeholder: t`Location of stop`,
          onChange: handlers.update('title'),
        }),
      ),
    ),
    ce('td', {},
      ce(Form.Item, {},
        ce(Input, {
          value: description,
          placeholder: t`Information about stop`,
          onChange: handlers.update('description'),
        }),
      ),
    ),
    ce('td', {},
      ce(Button, { onClick: handlers.decrement }, 'Up'),
      ce(Button, { onClick: handlers.increment }, 'Dn'),
      ce(Button, { onClick: handlers.remove }, 'X'),
    ),
  )
);

const WalkStops = ({ points, handlers }) => (
  ce('table', { className: 'ant-table-body' },
    ce('thead', { className: 'ant-table-thead' },
      ce('tr', {},
        ce('th', {}, '#'),
        ce('th', {}, t`Name`),
        ce('th', {}, t`Description`),
        ce('th', {}),
      ),
    ),
    ce('tbody', { className: 'ant-table-tbody' },
      points.map((point, key) => {
        const { properties: { title, description } } = point;
        return ce(WalkStop, {
          title,
          description,
          key,
          index: key,
          handlers: handlers.point(point),
        });
      }),
    )
  )
);

export default WalkStops;
