import classes from 'classnames';

export const Skeleton = ({ children, isLoading, ...rest }) => {
  if (isLoading) {
    return (
      <div
        className={classes(
          'flex w-full animate-pulse overflow-hidden rounded-lg bg-neutral-800',
          rest.className,
        )}
      >
        <div className="opacity-0">{children}</div>
      </div>
    );
  }

  return children;
};
