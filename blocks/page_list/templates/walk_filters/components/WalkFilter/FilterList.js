import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';
import { DatePicker } from 'antd';

import Filter from './Filter';

const FilterList = ({
  disabledStartDate,
  disabledEndDate,
  handleStartDate,
  handleEndDate,
  setFilter,
  filters = [],
  dateRange = [],
  selectedFilters = {},
}) => (
  ce('section', null,
    ce('ul', { className: 'filters' },
      ce('li', null,
        ce('label', null, t`Dates & Times`),
        ce(DatePicker, {
          disabledDate: disabledStartDate,
          showTime: true,
          format: 'YYYY-MM-DD HH:mm',
          value: dateRange[0],
          placeholder: t`After`,
          onChange: handleStartDate,
        }),
        ce(DatePicker, {
          disabledDate: disabledEndDate,
          showTime: true,
          format: 'YYYY-MM-DD HH:mm',
          value: dateRange[1],
          placeholder: t`Before`,
          onChange: handleEndDate,
        }),
      ),
      filters.map(([key, { name, data }]) => ce(Filter, {
        key,
        name,
        data,
        selected: selectedFilters[key],
        onChange: (option) => setFilter(key, option),
      })),
    )
  )
);

export default FilterList;
