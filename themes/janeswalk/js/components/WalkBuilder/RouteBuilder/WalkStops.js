/**
 * WalkStops
 *
 * A table showing the stops your Walk will take.
 */
import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';
import { Form, Button, Input } from 'antd';

const itemProps = { style: { margin: 0 } };

const getPlaceholder = (index, total) => {
  if (index === 0) return t`Meeting place`;
  if (index === total - 1) return t`Last stop`;
  return t`Location of stop`;
};

const WalkStop = ({ title, description, index, total, handlers }) => (
  ce('tr', { className: 'ant-table-row ant-table-row-level-0' },
    ce('td', {}, ce('strong', {}, String.fromCharCode(65 + index))),
    ce('td', {},
      ce(Form.Item, itemProps,
        ce(Input, {
          value: title,
          placeholder: getPlaceholder(index, total),
          onChange: handlers.update('title'),
        }),
      ),
    ),
    ce('td', {},
      ce(Form.Item, itemProps,
        ce(Input, {
          value: description,
          placeholder: t`Information about stop`,
          onChange: handlers.update('description'),
        }),
      ),
    ),
    ce('td', {},
      ce(Button, { shape: 'circle', onClick: handlers.decrement },
        ce('i', { className: 'fa fa-arrow-up' }),
      ),
      ce(Button, { shape: 'circle', onClick: handlers.increment },
        ce('i', { className: 'fa fa-arrow-down' }),
      ),
      ce(Button, { shape: 'circle', onClick: handlers.remove },
        ce('i', { className: 'fa fa-times' }),
      ),
    ),
  )
);

const WalkStops = ({ points, handlers }) => points.size ? (
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
      points.map((point, index) => {
        const {
          properties: { title, description },
          geometry: {
            coordinates: [lng, lat],
          },
        } = point;
        return ce(WalkStop, {
          title,
          description,
          key: `stop${lat}${lng}`,
          index,
          total: points.size,
          handlers: handlers.point(point),
        });
      }),
    )
  )
) : null;

export default WalkStops;
