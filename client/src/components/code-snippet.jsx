import cx from 'classnames';

export const CodeSnippet = ({ children, ...rest }) => {
  const classes = cx('overflow-hidden rounded-lg bg-stone-900 p-4', rest.className);

  return (
    <pre className={classes}>
      <code className="font-mono text-xs">{children}</code>
    </pre>
  );
};
