import { DateTime } from 'luxon';
import useSWR, { type SWRResponse } from 'swr';

import type { AverageSnapshot } from '@/types/average-snapshot';
import { fetcher } from '@/utilities/fetcher';

export const useAverageSnapshot = (since?: string): SWRResponse<AverageSnapshot, Error> => {
  const url = `${import.meta.env.VITE_API_URL}/api/snapshot/average`;
  const params = new URLSearchParams();

  if (since) {
    const date = DateTime.fromFormat(since, 'yyyy-MM-dd');

    if (!date.isValid) {
      throw new Error('Invalid date format: expected format yyyy-MM-dd');
    }

    params.append('since', date.toISO());
  }

  return useSWR<AverageSnapshot, Error>(`${url}?${params.toString()}`, fetcher);
};
