import type { FilterValues } from '../types/filter-values.type';

export interface Section {
  refresh(filters?: FilterValues): Promise<void>;
}
