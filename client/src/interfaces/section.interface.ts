import type { FilterState } from '../types/filter-state.type';

export interface Section {
  refresh(filters?: FilterState): Promise<void>;
}
