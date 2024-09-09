import cx from 'classnames';
import { generate } from '@bramus/pagination-sequence';

import { PaginationButton } from '@/components/pagination-button';

export const Pagination = ({ page, pages, onChange, ...rest }) => {
  const sequence = generate(page, pages > 0 ? pages : 1, 1, 1);
  const classes = cx('flex justify-center gap-2', rest.className);

  return (
    <ul className={classes}>
      {sequence.map((item, index) => (
        <li key={index} className="text-sm">
          <PaginationButton content={item} isCurrentPage={item === page} onClick={onChange} />
        </li>
      ))}
    </ul>
  );
};
