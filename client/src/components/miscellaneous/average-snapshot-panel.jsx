import classes from 'classnames';

import { prepareUserReadableSnapshot } from '@/utils/prepare-user-readable-snapshot';

export const AverageSnapshotPanel = ({ snapshot, ...rest }) => {
  const readableSnapshot = prepareUserReadableSnapshot(snapshot);

  return (
    <div className={classes('flex flex-col rounded-lg bg-neutral-800 p-4', rest.className)}>
      <p className="mx-auto mb-4 text-lg">Average Snapshot</p>
      <ul className="flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x lg:divide-neutral-600">
        <li className="px-12 text-center md:px-16">
          <h4 className="text-4xl font-semibold">{readableSnapshot.download}</h4>
          <p className="mt-3 font-medium text-neutral-400">Download Speed</p>
        </li>
        <li className="px-12 text-center md:px-16">
          <h4 className="text-4xl font-semibold">{readableSnapshot.upload}</h4>
          <p className="mt-3 font-medium text-neutral-400">Upload Speed</p>
        </li>
        <li className="px-12 text-center md:px-16">
          <h4 className="text-4xl font-semibold">{readableSnapshot.ping}</h4>
          <p className="mt-3 font-medium text-neutral-400">Latency</p>
        </li>
        <li className="px-12 text-center md:px-16">
          <h4 className="text-4xl font-semibold">{readableSnapshot.loss}</h4>
          <p className="mt-3 font-medium text-neutral-400">Packet Loss</p>
        </li>
      </ul>
    </div>
  );
};
