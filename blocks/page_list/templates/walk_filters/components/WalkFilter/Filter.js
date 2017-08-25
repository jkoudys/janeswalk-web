import { createElement as ce } from 'react';
import { Select } from 'antd';
import t from 'es2015-i18n-tag';

const Filter = ({ name, selected = '', onChange, data }) => (
  ce('li', null,
    ce('label', null, name),
    ce(Select, { value: selected, onChange, style: { width: '100%' } },
      ce(Select.Option, { value: '' }, t`All`),
      Object.entries(data)
      .map(([value, description]) => ce(Select.Option, {
        key: value,
        value,
      }, t([description]))),
    ),
  )
);

export default Filter;
