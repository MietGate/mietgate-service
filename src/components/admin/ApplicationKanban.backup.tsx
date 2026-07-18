"use client";

import Link from "next/link";
import { useState } from "react";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";


type Props = {
  applications:any[];
};



const columns = [
  "Vorbereitung",
  "Beworben",
  "Antwort erhalten",
  "Besichtigung",
  "Zusage",
  "Absage",
];



function ApplicationCard({
  app,
  isDragging=false
}:{
  app:any;
  isDragging?:boolean;
}){


  const {
    attributes,
    listeners,
    setNodeRef,
    transform
  } = useDraggable({
    id:app.id
  });


  const style = transform
    ? {
        transform:
          `translate3d(${transform.x}px,${transform.y}px,0)`
      }
    : undefined;



  return (

    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        rounded-2xl
        bg-white
        p-4
        shadow-sm
        cursor-grab
        ${isDragging ? "opacity-50":""}
      `}
    >


      <Link href={`/admin/bewerbungen/${app.id}`}>

        <h3 className="font-bold text-slate-900">
          {app.apartment_title}
        </h3>


        <p className="text-sm text-slate-500 mt-1">
          {app.city}
        </p>


        <p className="text-sm mt-3">
          Kunde:
          <span className="font-semibold ml-1">
            {app.customer?.full_name || "-"}
          </span>
        </p>


      </Link>


    </div>

  );

}





function Column({
  title,
  applications
}:{
  title:string;
  applications:any[];
}){


  const {
    setNodeRef
  } = useDroppable({
    id:title
  });



  return (

    <div
      ref={setNodeRef}
      className="
        bg-slate-100
        rounded-3xl
        p-4
        min-h-[500px]
      "
    >

      <h2 className="
        font-bold
        mb-4
      ">
        {title}

        <span className="
          ml-2
          text-sm
          text-slate-500
        ">
          ({applications.length})
        </span>

      </h2>


      <div className="space-y-4">


        {
          applications.map(app=>(

            <ApplicationCard
              key={app.id}
              app={app}
            />

          ))
        }


      </div>


    </div>

  );

}





export default function ApplicationKanban({
  applications
}:Props){


  const [
    items,
    setItems
  ] = useState(applications);



  const [
    active,
    setActive
  ] = useState<any>(null);




  function handleDragStart(event:any){

    const found =
      items.find(
        item=>item.id===event.active.id
      );

    setActive(found);

  }





  async function handleDragEnd(
    event:DragEndEvent
  ){


    setActive(null);


    const {
      active,
      over
    } = event;



    if(!over)
      return;



    const applicationId =
      active.id.toString();



    const newStatus =
      over.id.toString();



    console.log(
      "MOVE",
      applicationId,
      newStatus
    );



    await fetch(
      "/api/admin/applications",
      {
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          applicationId,
          status:newStatus
        })
      }
    );



    setItems(prev=>

      prev.map(item=>

        item.id===applicationId

        ?

        {
          ...item,
          status:newStatus
        }

        :

        item

      )

    );


  }





  return (

    <DndContext

      onDragStart={handleDragStart}

      onDragEnd={handleDragEnd}

    >


      <div
        className="
          grid
          gap-5
          xl:grid-cols-6
        "
      >


        {
          columns.map(column=>(

            <Column

              key={column}

              title={column}

              applications={
                items.filter(
                  app=>app.status===column
                )
              }

            />

          ))
        }


      </div>



      <DragOverlay>

        {
          active ?

          <ApplicationCard
            app={active}
            isDragging
          />

          :

          null
        }

      </DragOverlay>



    </DndContext>

  );

}