import { API_BASE_URL } from '../constants/api-base-url.constant';
import type { AverageSnapshot } from '../types/average-snapshot.type';
import type { FilterValues } from '../types/filter-values.type';
import { request } from '../utilities/request.utility';
import { toISOString } from '../utilities/to-iso-string.utility';

export const getAverageSnapshot = (filters?: FilterValues): Promise<AverageSnapshot> => {
  const base = `${API_BASE_URL}/api/snapshot/average`;
  const parameters = new URLSearchParams();

  if (filters?.since) {
    parameters.set('since', toISOString(filters.since));
  }

  const query = parameters.toString();

  return request<AverageSnapshot>(`${base}${query ? `?${query}` : ''}`);
};
