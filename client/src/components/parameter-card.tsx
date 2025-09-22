export interface ParameterCardProps {
  icon: string;
  title: string;
  value: number | string;
  unit: string;
}

export const ParameterCard = ({ icon, title, value, unit }: ParameterCardProps) => {
  return (
    <div className="flex items-center justify-between gap-1 rounded-lg bg-neutral-800 p-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-700 to-emerald-500">
        <img src={icon} alt={title} className="m-auto h-10 w-10" />
      </div>
      <div className="text-right">
        <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">
          {value} {unit}
        </h4>
        <p className="text-sm font-light capitalize">{title}</p>
      </div>
    </div>
  );
};
