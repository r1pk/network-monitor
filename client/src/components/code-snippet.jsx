import cn from 'classnames';

export const CodeSnippet = ({ children, ...rest }) => {
  return (
    <pre className={cn('overflow-hidden rounded-lg bg-stone-900 p-4', rest.className)}>
      <code className="font-mono text-xs">{children}</code>
    </pre>
  );
};
