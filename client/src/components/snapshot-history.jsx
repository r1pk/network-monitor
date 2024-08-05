import { useState } from 'react';

import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Pagination } from '@nextui-org/pagination';
import { Snippet } from '@nextui-org/snippet';

export const SnapshotHistory = ({ snapshots }) => {
  const [page, setPage] = useState(1);

  const SNAPSHOTS_PER_PAGE = 5;
  const pages = Math.ceil(snapshots.length / SNAPSHOTS_PER_PAGE);

  const start = (page - 1) * SNAPSHOTS_PER_PAGE;
  const end = start + SNAPSHOTS_PER_PAGE;

  return (
    <Card>
      <CardHeader>
        <p className="text-large mx-auto">Snapshot History</p>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            {snapshots.slice(start, end).map((snapshot) => (
              <Snippet key={snapshot.id} symbol={false}>
                <pre>{JSON.stringify(snapshot, null, 2)}</pre>
              </Snippet>
            ))}
            {snapshots.length === 0 && (
              <span className="text-small text-white/60 uppercase font-bold mx-auto my-4">No Snapshots Available</span>
            )}
          </div>
          {snapshots.length > SNAPSHOTS_PER_PAGE && (
            <div className="mx-auto">
              <Pagination isCompact showControls initialPage={1} total={pages} onChange={setPage} />
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
