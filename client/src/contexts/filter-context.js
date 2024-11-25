import { createContext, useContext } from 'react';

export const defaultContextValue = {
  filters: {
    since: null,
  },
  setFilters: () => {},
};

export const FilterContext = createContext(defaultContextValue);
export const useFilterContext = () => useContext(FilterContext);
