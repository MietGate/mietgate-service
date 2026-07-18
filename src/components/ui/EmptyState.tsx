import React from "react";
import { Inbox } from "lucide-react";


type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};


export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {


  return (

    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      rounded-3xl
      border
      border-dashed
      border-slate-200
      bg-white
      p-10
      text-center
      "
    >


      <div
        className="
        mb-4
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        bg-slate-100
        text-slate-500
        "
      >

        <Inbox size={28}/>

      </div>



      <h3
        className="
        text-lg
        font-semibold
        text-slate-900
        "
      >

        {title}

      </h3>



      {
        description && (

          <p
            className="
            mt-2
            max-w-md
            text-sm
            text-slate-600
            "
          >

            {description}

          </p>

        )
      }



      {
        action && (

          <div className="mt-6">

            {action}

          </div>

        )
      }



    </div>

  );

}