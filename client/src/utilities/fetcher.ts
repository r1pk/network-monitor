export const fetcher = async <T = unknown>(input: string | URL | Request, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} (${response.statusText}) at ${response.url}`);
  }

  return response.json() as Promise<T>;
};
