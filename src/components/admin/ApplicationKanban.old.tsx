"use client";

import Link from "next/link";
import { useState } from "react";

import {
  DndContext,
  DragEndEvent,
  closestCorners
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";


type Props = {
  applications:any[];
};


function CardItem({
  app
}:{
  app:any;
}){

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id:app.id
  });


  const style = {
    transform:CSS.Transform.toString(transform),
    transition
  };


  return (

    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="
        rounded-2xl
        bg-white
        p-4
        shadow-sm
      "
    >

      <div
        className="
          mb-2
          cursor-grab
          select-none
          text-xs
          text-slate-400
        "
      >
        ⋮⋮ Ziehen
      </div>


      <Link href={`/admin/bewerbungen/${app.id}`}>

        <h3 className="font-bold">
          {app.apartment_title || "Wohnung"}
        </h3>


        <p className="mt-1 text-sm text-slate-600">
          {app.city}
        </p>


        <p className="mt-3 text-sm">
          Kunde:
          <span className="ml-1 font-semibold">
            {app.customer?.full_name || "-"}
          </span>
        </p>

      </Link>


    </div>

  );

}



function Column({
  name,
  applications
}:{
  name:string;
  applications:any[];
}){


  return (

    <div
      data-column={name}
      className="
        rounded-3xl
        bg-slate-100
        p-4
        min-h-96
      "
    >

      <h2 className="font-bold mb-4">

        {name}

        <span className="ml-2 text-sm text-slate-500">
          ({applications.length})
        </span>

      </h2>


      <SortableContext
        items={applications.map(app=>app.id)}
      >

        <div className="space-y-4">

          {applications.map(app=>(

            <CardItem
              key={app.id}
              app={app}
            />

          ))}

        </div>

      </SortableContext>


    </div>

  );

}




export default function ApplicationKanban({
  applications
}:Props){


  const [items,setItems] =
    useState(applications);


  const columns = [
    "Vorbereitung",
    "Beworben",
    "Antwort erhalten",
    "Besichtigung",
    "Zusage",
    "Absage"
  ];



  async function handleDragEnd(
    event:DragEndEvent
  ){

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
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >

      <div
        className="
          grid
          gap-5
          xl:grid-cols-6
        "
      >

        {columns.map(column=>(

          <Column
            key={column}
            name={column}
            applications={
              items.filter(
                app=>app.status===column
              )
            }
          />

        ))}


      </div>


    </DndContext>

  );

}



