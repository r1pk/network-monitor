export const getServerPath = () => {
  const { VITE_SERVER_IP, VITE_SERVER_APP_PORT } = import.meta.env;
  const { protocol } = window.location;

  return protocol + '//' + VITE_SERVER_IP + ':' + VITE_SERVER_APP_PORT;
};
