import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  onClick,
}: ButtonProps) {
  const variants = {
    primary:
      "bg-teal-600 text-white hover:bg-teal-700",
    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-200",
    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        rounded-xl
        px-5
        py-3
        font-semibold
        transition
        duration-200
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}