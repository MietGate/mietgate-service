import React from "react";


type CheckboxProps = {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (
    checked: boolean
  ) => void;
};


export default function Checkbox({
  label,
  checked = false,
  disabled = false,
  onChange,
}: CheckboxProps) {


  return (

    <label
      className={`
        flex
        items-center
        gap-3
        cursor-pointer
        select-none

        ${
          disabled
          ?
          "opacity-50 cursor-not-allowed"
          :
          ""
        }
      `}
    >


      <input

        type="checkbox"

        checked={checked}

        disabled={disabled}

        onChange={(event) =>
          onChange?.(
            event.target.checked
          )
        }

        className="
          h-5
          w-5
          rounded
          border-slate-300
          text-teal-600
          focus:ring-teal-500
        "

      />


      <span
        className="
        text-sm
        font-medium
        text-slate-700
        "
      >

        {label}

      </span>


    </label>

  );

}


