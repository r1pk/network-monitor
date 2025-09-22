import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

import { DateTime } from 'luxon';

export type Filters = {
  since: string;
};

export type FilterContextType = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

export const defaultContextValue: FilterContextType = {
  filters: {
    since: DateTime.now().minus({ days: 1 }).toFormat('yyyy-MM-dd'),
  },
  setFilters: () => {},
};

export const FilterContext = createContext<FilterContextType>(defaultContextValue);
export const useFilterContext = (): FilterContextType => useContext(FilterContext);
