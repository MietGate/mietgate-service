import React from "react";


type ProgressProps = {
  value: number;
  label?: string;
};


export default function Progress({
  value,
  label,
}: ProgressProps) {


  const percentage = Math.min(
    100,
    Math.max(
      0,
      value
    )
  );


  return (

    <div className="space-y-3">


      {
        label && (

          <div
            className="
            flex
            justify-between
            text-sm
            font-medium
            text-slate-700
            "
          >

            <span>
              {label}
            </span>


            <span>
              {percentage}%
            </span>

          </div>

        )
      }



      <div
        className="
        h-3
        w-full
        overflow-hidden
        rounded-full
        bg-slate-100
        "
      >

        <div

          className="
          h-full
          rounded-full
          bg-teal-600
          transition-all
          duration-500
          "

          style={{
            width: `${percentage}%`,
          }}

        />

      </div>



    </div>

  );

}


