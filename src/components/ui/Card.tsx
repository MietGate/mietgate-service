import React from "react";


type CardProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};


export default function Card({
  children,
  title,
  description,
  className = "",
}: CardProps) {


  return (

    <div
      className={`
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        ${className}
      `}
    >


      {
        title && (

          <div className="mb-6">


            <h3
              className="
              text-xl
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
                  text-sm
                  text-slate-600
                  "
                >

                  {description}

                </p>

              )
            }


          </div>

        )
      }



      {children}



    </div>

  );

}


