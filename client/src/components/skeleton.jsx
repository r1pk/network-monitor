import cx from 'classnames';

export const Skeleton = ({ children, isLoading, ...rest }) => {
  const classes = cx('flex w-full animate-pulse overflow-hidden rounded-lg bg-neutral-800', rest.className);

  if (isLoading) {
    return (
      <div className={classes}>
        <div className="opacity-0">{children}</div>
      </div>
    );
  }

  return children;
};
