import cn from 'classnames';

export const Divider = (props) => {
  return <hr className={cn('my-4 h-px w-full border-none bg-neutral-600', props.className)} />;
};
