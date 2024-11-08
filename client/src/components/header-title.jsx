export const HeaderTitle = ({ title = 'Home' }) => {
  return (
    <h2 className="flex items-center gap-x-2">
      <span className="text-lg font-bold uppercase">network-monitor</span>
      <span>::</span>
      <span className="font-medium uppercase">{title}</span>
    </h2>
  );
};
