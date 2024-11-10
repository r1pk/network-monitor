import useSWR from 'swr';

import { makeFetchRequest } from '@/utils/make-fetch-request';

export const useAverageSnapshot = (since) => {
  const url = import.meta.env.VITE_API_URL + '/api/speed-test/average';
  const params = new URLSearchParams();

  if (since !== undefined) {
    params.append('since', since.toISOString());
  }

  return useSWR(url + '?' + params.toString(), makeFetchRequest);
};
