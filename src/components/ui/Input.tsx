interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

export default function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  disabled = false,
  className = "",
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-slate-900
          outline-none
          transition
          focus:border-teal-500
          focus:ring-2
          focus:ring-teal-100
          disabled:cursor-not-allowed
          disabled:bg-slate-100
          ${className}
        `}
      />
    </div>
  );
}