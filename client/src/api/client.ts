import { API_BASE_URL } from '../constants/api-base-url.constant';
import type { AverageSnapshot } from '../types/average-snapshot.type';
import { request } from '../utilities/request.utility';
import { toISOString } from '../utilities/to-iso-string.utility';

export const getAverageSnapshot = (since?: string): Promise<AverageSnapshot> => {
  const base = `${API_BASE_URL}/api/snapshot/average`;
  const parameters = new URLSearchParams();

  if (since) {
    parameters.set('since', toISOString(since));
  }

  const query = parameters.toString();

  return request<AverageSnapshot>(`${base}${query ? `?${query}` : ''}`);
};
