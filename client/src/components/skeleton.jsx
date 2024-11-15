export const Skeleton = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <div className="flex w-full animate-pulse overflow-hidden rounded-lg bg-neutral-800">
        <div className="opacity-0">{children}</div>
      </div>
    );
  }

  return children;
};
