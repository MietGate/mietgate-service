import React from "react";


type LoadingProps = {
  text?: string;
};


export default function Loading({
  text = "Lädt...",
}: LoadingProps) {


  return (

    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      gap-4
      py-10
      "
    >


      <div
        className="
        h-10
        w-10
        animate-spin
        rounded-full
        border-4
        border-slate-200
        border-t-teal-600
        "
      />



      <p
        className="
        text-sm
        text-slate-600
        "
      >

        {text}

      </p>


    </div>

  );

}



