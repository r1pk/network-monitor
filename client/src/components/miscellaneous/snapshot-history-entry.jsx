import classes from 'classnames';

import { prepareUserReadableSnapshot } from '@/utils/prepare-user-readable-snapshot';

export const SnapshotHistoryEntry = ({ snapshot, ...rest }) => {
  const readableSnapshot = prepareUserReadableSnapshot(snapshot);

  return (
    <div className={classes('flex flex-col gap-2 rounded-lg bg-stone-900 p-4', rest.className)}>
      <span className="font-bold">Snapshot #{snapshot.id}</span>
      <div className="flex flex-wrap gap-2">
        <span className="rounded bg-blue-900 px-2.5 py-0.5 text-sm font-medium text-blue-300">
          Download Speed: {readableSnapshot.download}
        </span>
        <span className="rounded bg-blue-900 px-2.5 py-0.5 text-sm font-medium text-blue-300">
          Upload Speed: {readableSnapshot.upload}
        </span>
        <span className="rounded bg-blue-900 px-2.5 py-0.5 text-sm font-medium text-blue-300">
          Latency: {readableSnapshot.ping}
        </span>
        <span className="rounded bg-blue-900 px-2.5 py-0.5 text-sm font-medium text-blue-300">
          Packet Loss: {readableSnapshot.loss}
        </span>
      </div>
      <div className="flex gap-2 text-xs text-neutral-400">
        <span>{readableSnapshot.timestamp}</span>
        <span>•</span>
        <a href={snapshot.url} className="text-blue-500 hover:underline">
          speedtest.net
        </a>
      </div>
    </div>
  );
};
