import cx from 'classnames';

export const Divider = (props) => {
  const classes = cx('my-4 h-px w-full border-none bg-neutral-600', props.className);

  return <hr className={classes} />;
};
