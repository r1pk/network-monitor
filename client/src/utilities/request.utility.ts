export const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`Request to ${response.url} failed: HTTP ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};
