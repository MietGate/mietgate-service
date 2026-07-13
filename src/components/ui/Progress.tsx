interface ProgressProps {
  value: number;
  label?: string;
}

export default function Progress({
  value,
  label,
}: ProgressProps) {
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="font-medium text-slate-700">
            {label}
          </span>

          <span className="text-slate-500">
            {value}%
          </span>
        </div>
      )}

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-teal-600 transition-all duration-500"
          style={{
            width: `${Math.min(Math.max(value, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  );
}