import React from "react";


type InputProps = {
  label?: string;
  placeholder?: string;
  value?: string | number;
  type?: string;
  name?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  className?: string;
};


export default function Input({
  label,
  placeholder,
  value,
  type = "text",
  name,
  disabled = false,
  error,
  onChange,
  className = "",
}: InputProps) {


  return (

    <div className="space-y-2">


      {
        label && (

          <label
            className="
            block
            text-sm
            font-medium
            text-slate-700
            "
          >

            {label}

          </label>

        )
      }



      <input

        name={name}

        type={type}

        value={value ?? ""}

        placeholder={placeholder}

        disabled={disabled}

        onChange={onChange}

        className={`
          w-full
          rounded-xl
          border
          bg-white
          px-4
          py-3
          text-slate-900
          outline-none
          transition
          placeholder:text-slate-400

          focus:border-teal-500
          focus:ring-2
          focus:ring-teal-100

          disabled:bg-slate-100
          disabled:cursor-not-allowed

          ${
            error
            ?
            "border-red-500"
            :
            "border-slate-200"
          }

          ${className}
        `}

      />



      {
        error && (

          <p
            className="
            text-sm
            text-red-600
            "
          >

            {error}

          </p>

        )
      }



    </div>

  );

}