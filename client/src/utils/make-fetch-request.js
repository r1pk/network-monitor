export const makeFetchRequest = (...args) => {
  return fetch(...args).then((response) => response.json());
};
