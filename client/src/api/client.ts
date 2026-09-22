import { API_BASE_URL } from '../constants/api-base-url.constant';
import type { AverageSnapshot } from '../types/average-snapshot.type';
import type { FilterState } from '../types/filter-state.type';
import type { Snapshot } from '../types/snapshot.type';
import { request } from '../utilities/request.utility';
import { toISOString } from '../utilities/to-iso-string.utility';

export const getAverageSnapshot = (filters?: FilterState): Promise<AverageSnapshot> => {
  const url = new URL('/api/snapshot/average', API_BASE_URL);

  if (filters?.since) {
    url.searchParams.set('since', toISOString(filters.since));
  }

  return request<AverageSnapshot>(url.toString());
};

export const getSnapshots = (filters?: FilterState): Promise<Snapshot[]> => {
  const url = new URL('/api/snapshot', API_BASE_URL);

  if (filters?.since) {
    url.searchParams.set('since', toISOString(filters.since));
  }

  return request<Snapshot[]>(url.toString());
};
