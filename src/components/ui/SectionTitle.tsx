import React from "react";
import { LucideIcon } from "lucide-react";


type SectionTitleProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
};


export default function SectionTitle({
  title,
  description,
  icon: Icon,
}: SectionTitleProps) {


  return (

    <div
      className="
      flex
      items-start
      gap-4
      "
    >


      {
        Icon && (

          <div
            className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-teal-50
            text-teal-600
            "
          >

            <Icon size={22}/>

          </div>

        )
      }



      <div>


        <h2
          className="
          text-xl
          font-semibold
          text-slate-900
          "
        >

          {title}

        </h2>



        {
          description && (

            <p
              className="
              mt-1
              text-sm
              text-slate-600
              "
            >

              {description}

            </p>

          )
        }


      </div>


    </div>

  );

}


