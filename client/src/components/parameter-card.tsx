export interface ParameterCardProps {
  icon: string;
  title: string;
  value: number | string;
  unit: string;
}

export const ParameterCard = ({ icon, title, value, unit }: ParameterCardProps) => {
  return (
    <div className="flex justify-between rounded-lg bg-neutral-800 p-3">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500">
        <img src={icon} alt={title} className="m-auto h-10 w-10" />
      </div>
      <div className="pt-1 text-right">
        <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">
          {value} {unit}
        </h4>
        <p className="text-sm font-light capitalize">{title}</p>
      </div>
    </div>
  );
};
