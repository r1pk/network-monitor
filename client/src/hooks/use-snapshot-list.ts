import { DateTime } from 'luxon';
import useSWR, { type SWRResponse } from 'swr';

import type { Snapshot } from '@/types/snapshot';
import { fetcher } from '@/utilities/fetcher';

export const useSnapshotList = (since?: string): SWRResponse<Snapshot[], Error> => {
  const url = `${import.meta.env.VITE_API_URL}/api/snapshot`;
  const params = new URLSearchParams();

  if (since) {
    const date = DateTime.fromFormat(since, 'yyyy-MM-dd');

    if (!date.isValid) {
      throw new Error('Invalid date format: expected format yyyy-MM-dd');
    }

    params.append('since', date.toISO());
  }

  return useSWR<Snapshot[], Error>(`${url}?${params.toString()}`, fetcher);
};
