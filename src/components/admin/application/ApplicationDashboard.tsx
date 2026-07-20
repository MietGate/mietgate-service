"use client";


import { useMemo, useState } from "react";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";

import ApplicationStats from "./ApplicationStats";
import ApplicationCard from "./ApplicationCard";



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
        rounded-3xl
        bg-slate-100
        p-4
        min-h-[600px]
      "

    >


      <h2 className="
        mb-5
        font-bold
        text-slate-800
      ">

        {title}

        <span className="
          ml-2
          text-sm
          text-slate-500
        ">

          {applications.length}

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








export default function ApplicationDashboard({
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





  const [
    search,
    setSearch
  ] = useState("");





  const [
    filter,
    setFilter
  ] = useState("Alle");







  const filtered = useMemo(()=>{


    return items.filter(app=>{


      const text = `

        ${app.apartment_title}

        ${app.city}

        ${app.address}

        ${app.customer?.full_name}

        ${app.customer?.email}

      `.toLowerCase();




      return (

        text.includes(
          search.toLowerCase()
        )

        &&

        (
          filter==="Alle"

          ||

          app.status===filter
        )

      );


    });


  },[
    items,
    search,
    filter
  ]);









  function dragStart(event:any){


    const item =
      items.find(
        x =>
        x.id===event.active.id
      );


    setActive(item);

  }









  async function dragEnd(
    event:DragEndEvent
  ){


    setActive(null);



    if(!event.over)
      return;




    const id =
      event.active.id.toString();



    const status =
      event.over.id.toString();




    if(!columns.includes(status))
      return;






    setItems(prev=>

      prev.map(item=>

        item.id===id

        ?

        {
          ...item,
          status
        }

        :

        item

      )

    );






    await fetch(
      "/api/admin/applications",
      {

        method:"PATCH",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          applicationId:id,

          status

        })

      }

    );


  }








  return (

    <DndContext

      onDragStart={dragStart}

      onDragEnd={dragEnd}

    >



      <ApplicationStats

        applications={items}

      />






      <div className="
        mb-8
        rounded-3xl
        bg-white
        p-5
        shadow-sm
        border
      ">


        <div className="
          grid
          gap-4
          md:grid-cols-2
        ">


          <input

            value={search}

            onChange={
              e=>
              setSearch(
                e.target.value
              )
            }

            placeholder="&#128269; Bewerbung suchen..."

            className="
              rounded-xl
              border
              px-4
              py-3
            "

          />





          <select

            value={filter}

            onChange={
              e=>
              setFilter(
                e.target.value
              )
            }

            className="
              rounded-xl
              border
              px-4
              py-3
            "

          >

            <option>
              Alle
            </option>


            {
              columns.map(c=>(

                <option key={c}>
                  {c}
                </option>

              ))
            }


          </select>


        </div>


      </div>








      <div className="
        grid
        gap-5
        xl:grid-cols-6
      ">


        {
          columns.map(column=>(


            <Column

              key={column}

              title={column}

              applications={
                filtered.filter(
                  app =>
                  app.status===column
                )
              }

            />


          ))
        }


      </div>








      <DragOverlay>


        {
          active &&

          <ApplicationCard

            app={active}

            isDragging

          />

        }


      </DragOverlay>



    </DndContext>


  );


}


