import classes from 'classnames';

import { convertBytesToMegabits } from '@/utils/convert-bytes-to-megabits';

export const SnapshotHistoryEntry = ({ snapshot, ...rest }) => {
  const download = convertBytesToMegabits(snapshot.download || 0);
  const upload = convertBytesToMegabits(snapshot.upload || 0);
  const latency = (snapshot.ping || 0).toFixed(2);
  const loss = (snapshot.loss || 0).toFixed(2);
  const timestamp = new Date(snapshot.timestamp || 0).toLocaleString();

  return (
    <div className={classes('flex flex-col gap-2 rounded-lg bg-stone-900 p-4', rest.className)}>
      <span className="font-bold">Snapshot #{snapshot.id}</span>
      <div className="flex flex-wrap gap-2">
        <span className="rounded bg-blue-900 px-2.5 py-0.5 text-sm font-medium text-blue-300">
          Download Speed: {download} Mbps
        </span>
        <span className="rounded bg-blue-900 px-2.5 py-0.5 text-sm font-medium text-blue-300">
          Upload Speed: {upload} Mbps
        </span>
        <span className="rounded bg-blue-900 px-2.5 py-0.5 text-sm font-medium text-blue-300">
          Latency: {latency} ms
        </span>
        <span className="rounded bg-blue-900 px-2.5 py-0.5 text-sm font-medium text-blue-300">
          Packet Loss: {loss} %
        </span>
      </div>
      <div className="flex gap-2 text-xs text-neutral-400">
        <span>{timestamp}</span>
        <span>•</span>
        <a href={snapshot.url} className="text-blue-500 hover:underline">
          speedtest.net
        </a>
      </div>
    </div>
  );
};
