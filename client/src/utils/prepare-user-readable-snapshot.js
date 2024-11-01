import { convertBytesToMegabits } from '@/utils/convert-bytes-to-megabits';

export const prepareUserReadableSnapshot = (snapshot) => {
  return {
    download: convertBytesToMegabits(snapshot.download || 0) + ' Mbps',
    upload: convertBytesToMegabits(snapshot.upload || 0) + ' Mbps',
    ping: (snapshot.ping || 0).toFixed(2) + ' ms',
    loss: (snapshot.loss || 0).toFixed(2) + ' %',
    host: snapshot.host || 'N/A',
    timestamp: new Date(snapshot.timestamp || 0).toLocaleString(),
  };
};
