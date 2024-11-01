import { useState } from 'react';

import classes from 'classnames';

import { Pagination } from '@/components/common/pagination';
import { SnapshotHistoryEntry } from '@/components/miscellaneous/snapshot-history-entry';

export const SnapshotHistory = ({ snapshots, ...rest }) => {
  const [page, setPage] = useState(1);

  const SNAPSHOTS_PER_PAGE = 5;
  const TOTAL_PAGES = Math.ceil(snapshots.length / SNAPSHOTS_PER_PAGE);

  const start = (page - 1) * SNAPSHOTS_PER_PAGE;
  const end = start + SNAPSHOTS_PER_PAGE;

  const reversedSnapshotList = snapshots.slice().reverse();
  const currentPageSnapshots = reversedSnapshotList.slice(start, end);

  return (
    <div className={classes('flex flex-col rounded-lg bg-neutral-800 p-4', rest.className)}>
      <p className="mx-auto mb-4 text-lg">Snapshot History</p>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {currentPageSnapshots.map((snapshot) => (
            <SnapshotHistoryEntry key={snapshot.id} snapshot={snapshot} />
          ))}
          {snapshots.length === 0 && (
            <span className="mx-auto text-sm font-bold uppercase text-neutral-400">No Snapshots Available</span>
          )}
        </div>
        {snapshots.length > SNAPSHOTS_PER_PAGE && (
          <div className="mx-auto my-4">
            <Pagination page={page} pages={TOTAL_PAGES} onChange={setPage} />
          </div>
        )}
      </div>
    </div>
  );
};
