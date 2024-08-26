import { useState } from 'react';

import cx from 'classnames';

import { CodeSnippet } from '@/components/code-snippet';
import { Pagination } from '@/components/pagination';

export const SnapshotHistory = ({ snapshots, ...rest }) => {
  const [page, setPage] = useState(1);

  const SNAPSHOTS_PER_PAGE = 5;
  const TOTAL_PAGES = Math.ceil(snapshots.length / SNAPSHOTS_PER_PAGE);

  const start = (page - 1) * SNAPSHOTS_PER_PAGE;
  const end = start + SNAPSHOTS_PER_PAGE;

  const reversedSnapshotList = snapshots.slice().reverse();
  const currentPageSnapshots = reversedSnapshotList.slice(start, end);

  const classes = cx('flex flex-col rounded-lg bg-neutral-800 p-4', rest.className);

  return (
    <div className={classes}>
      <p className="mx-auto mb-4 text-lg">Snapshot History</p>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {currentPageSnapshots.map((snapshot) => (
            <CodeSnippet key={snapshot.id} symbol={false}>
              <pre>{JSON.stringify(snapshot, null, 2)}</pre>
            </CodeSnippet>
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
