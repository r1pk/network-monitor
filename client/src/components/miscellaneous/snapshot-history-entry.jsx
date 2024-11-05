import classes from 'classnames';

import { normalizeSnapshot } from '@/utils/normalize-snapshot';

export const SnapshotHistoryEntry = ({ snapshot, ...rest }) => {
  const normalizedSnapshot = normalizeSnapshot(snapshot);

  return (
    <div className={classes('flex flex-col gap-2 rounded-lg bg-stone-900 p-4', rest.className)}>
      <span className="font-bold">Snapshot #{snapshot.id}</span>
      <div className="flex flex-wrap gap-2">
        <span className="rounded bg-gray-700 px-2.5 py-0.5 text-sm font-medium text-gray-300">
          Download Speed: {normalizedSnapshot.download}
        </span>
        <span className="rounded bg-gray-700 px-2.5 py-0.5 text-sm font-medium text-gray-300">
          Upload Speed: {normalizedSnapshot.upload}
        </span>
        <span className="rounded bg-gray-700 px-2.5 py-0.5 text-sm font-medium text-gray-300">
          Latency: {normalizedSnapshot.ping}
        </span>
        <span className="rounded bg-gray-700 px-2.5 py-0.5 text-sm font-medium text-gray-300">
          Packet Loss: {normalizedSnapshot.loss}
        </span>
        <span className="rounded bg-gray-700 px-2.5 py-0.5 text-sm font-medium text-gray-300">
          Host: {normalizedSnapshot.host}
        </span>
      </div>
      <div className="flex gap-2 text-xs text-neutral-400">
        <span>{normalizedSnapshot.timestamp}</span>
        <span>•</span>
        <a href={snapshot.url} className="text-blue-500 hover:underline">
          speedtest.net
        </a>
      </div>
    </div>
  );
};
