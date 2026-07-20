import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
};


export default function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  onClick,
  className = "",
}: ButtonProps) {


  const variants = {
    primary:
      "bg-teal-600 text-white hover:bg-teal-700",

    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-200",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100",
  };


  return (

    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        flex
        items-center
        justify-center
        rounded-xl
        px-5
        py-3
        font-semibold
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
    >

      {
        loading
        ?
        "Speichern..."
        :
        children
      }


    </button>

  );
}


