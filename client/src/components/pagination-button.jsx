import cn from 'classnames';

export const PaginationButton = ({ content, isCurrentPage, onClick, ...rest }) => {
  const isPageNumber = Number.isInteger(content);

  const handleButtonClick = () => {
    if (isPageNumber) {
      onClick(content);
    }
  };

  return (
    <button
      type="button"
      disabled={!isPageNumber}
      onClick={handleButtonClick}
      className={cn(
        'rounded-lg px-3 py-2 duration-150',
        {
          'hover:bg-indigo-50 hover:text-neutral-800': isPageNumber,
          'bg-indigo-50 font-medium text-neutral-800': isCurrentPage,
        },
        rest.className,
      )}
    >
      {content}
    </button>
  );
};
