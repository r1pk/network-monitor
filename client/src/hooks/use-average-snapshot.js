import { DateTime } from 'luxon';
import useSWR from 'swr';

import { makeFetchRequest } from '@/utils/make-fetch-request';

export const useAverageSnapshot = (since) => {
  const url = import.meta.env.VITE_API_URL + '/api/snapshot/average';
  const params = new URLSearchParams();

  if (since) {
    params.append('since', DateTime.fromFormat(since, 'yyyy-MM-dd').toISO());
  }

  return useSWR(url + '?' + params.toString(), makeFetchRequest);
};
