import useSWR from 'swr';

import { makeFetchRequest } from '@/utils/make-fetch-request';

export const useSnapshotList = (since) => {
  const url = import.meta.env.VITE_API_URL + '/api/speed-test';
  const params = new URLSearchParams();

  if (since) {
    params.append('since', since.toISOString());
  }

  return useSWR(url + '?' + params.toString(), makeFetchRequest);
};
