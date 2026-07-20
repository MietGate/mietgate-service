"use client";

import Link from "next/link";
import { useDraggable } from "@dnd-kit/core";


type Props = {
  app:any;
  isDragging?:boolean;
};



function daysSince(date:string){

  const created =
    new Date(date).getTime();


  const now =
    Date.now();


  const diff =
    now - created;


  return Math.floor(
    diff /
    (1000 * 60 * 60 * 24)
  );

}




export default function ApplicationCard({
  app,
  isDragging=false
}:Props){


  const {
    attributes,
    listeners,
    setNodeRef,
    transform
  } = useDraggable({

    id:app.id

  });



  const style =
    transform
    ?
    {
      transform:
      `translate3d(${transform.x}px,${transform.y}px,0)`
    }
    :
    undefined;




  return (

    <div

      ref={setNodeRef}

      style={style}

      {...listeners}

      {...attributes}


      className={`
        rounded-2xl
        bg-white
        border
        p-5
        shadow-sm
        cursor-grab
        transition
        hover:shadow-md

        ${isDragging ? "opacity-50" : ""}
      `}

    >


      <Link
        href={`/admin/bewerbungen/${app.id}`}
      >



        <div className="
          flex
          justify-between
          gap-3
        ">


          <h3 className="
            font-bold
            text-slate-900
            line-clamp-2
          ">

            {app.apartment_title || "Wohnung"}

          </h3>



          <span className="
            rounded-full
            bg-teal-50
            px-3
            py-1
            text-xs
            text-teal-700
          ">

            {app.status}

          </span>


        </div>





        <div className="
  mt-4
  space-y-2
  text-sm
">

  <p>
    &#128205; {app.city || "-"}
  </p>

  <p>
    &#128205; {app.address || "-"}
  </p>

  <p>
    &#128100;{" "}
    <span className="font-semibold">
      {
        app.customer?.full_name
        ||
        "Kein Kunde"
      }
    </span>
  </p>

  <p className="text-slate-500">
    &#9201; Offen seit:

    {" "}

    {
      daysSince(
        app.created_at
      )
    }

    {" "}
    Tagen
  </p>

  {
    app.viewing_date && (

      <p className="text-teal-700">

        &#128197; Besichtigung:

        {" "}

        {
          new Date(
            app.viewing_date
          )
          .toLocaleDateString(
            "de-DE"
          )
        }

      </p>

    )
  }

</div>

{
  app.notes && (

    <div className="
      mt-3
      rounded-xl
      bg-slate-50
      p-3
      text-xs
      text-slate-600
    ">
      &#128196; {app.notes}
    </div>

  )
}


      </Link>


    </div>

  );

}



