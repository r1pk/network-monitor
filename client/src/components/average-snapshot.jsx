import cn from 'classnames';

import { convertBytesToMegabits } from '@/utils/convert-bytes-to-megabits';

export const AverageSnapshot = ({ snapshot, ...rest }) => {
  return (
    <div className={cn('flex flex-col rounded-lg bg-neutral-800 p-4', rest.className)}>
      <p className="mx-auto mb-4 text-lg">Average Snapshot</p>
      <ul className="flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x lg:divide-neutral-600">
        <li className="px-12 text-center md:px-16">
          <h4 className="text-4xl font-semibold">{convertBytesToMegabits(snapshot.download || 0)} Mbps</h4>
          <p className="mt-3 font-medium text-neutral-400">Download Speed</p>
        </li>
        <li className="px-12 text-center md:px-16">
          <h4 className="text-4xl font-semibold">{convertBytesToMegabits(snapshot.upload || 0)} Mbps</h4>
          <p className="mt-3 font-medium text-neutral-400">Upload Speed</p>
        </li>
        <li className="px-12 text-center md:px-16">
          <h4 className="text-4xl font-semibold">{(snapshot.ping || 0).toFixed(2)} ms</h4>
          <p className="mt-3 font-medium text-neutral-400">Latency</p>
        </li>
        <li className="px-12 text-center md:px-16">
          <h4 className="text-4xl font-semibold">{(snapshot.loss || 0).toFixed(2)} %</h4>
          <p className="mt-3 font-medium text-neutral-400">Packet Loss</p>
        </li>
      </ul>
    </div>
  );
};
