import useSWR from 'swr';

import { fetcher } from '../utils/fetcher';
import { getServerPath } from '../utils/get-server-path';

export const useAverageSnapshot = (since) => {
  const url = getServerPath() + '/api/speed-test/average';
  const params = new URLSearchParams();

  if (since !== undefined) {
    params.append('since', since.toISOString());
  }

  return useSWR(url + '?' + params.toString(), fetcher);
};
