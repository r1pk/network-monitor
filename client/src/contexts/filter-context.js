import { createContext, useContext } from 'react';

import { DateTime } from 'luxon';

export const defaultContextValue = {
  filters: {
    since: DateTime.now().minus({ days: 1 }).toFormat('yyyy-MM-dd'),
  },
  setFilters: () => {},
};

export const FilterContext = createContext(defaultContextValue);
export const useFilterContext = () => useContext(FilterContext);
