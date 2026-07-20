"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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
        p-5
        border
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
            📍 {app.city || "-"}
          </p>


          <p>
            🏠 {app.address || "-"}
          </p>



          <p>
            👤

            {" "}

            <span className="font-semibold">

              {app.customer?.full_name || "Kein Kunde"}

            </span>

          </p>




          <p className="text-slate-500">

            ⏱ Seit

            {" "}

            {daysSince(app.created_at)}

            {" "}

            Tagen offen

          </p>





          {
            app.viewing_date && (

              <p className="text-teal-700">

                📅 Besichtigung:

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





          {
            app.notes && (

              <p className="
                mt-3
                rounded-xl
                bg-slate-50
                p-3
                text-xs
                text-slate-600
              ">

                📝

                {" "}

                {app.notes}

              </p>

            )
          }




        </div>



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
        rounded-3xl
        bg-slate-100
        p-4
        min-h-[550px]
      "

    >


      <h2 className="
        mb-5
        font-bold
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



  const [
    search,
    setSearch
  ] = useState("");



  const [
    statusFilter,
    setStatusFilter
  ] = useState("Alle");





  const filteredItems =
    useMemo(()=>{


      return items.filter(app=>{


        const text =
        `
        ${app.apartment_title}
        ${app.city}
        ${app.address}
        ${app.customer?.full_name}
        `
        .toLowerCase();



        return (

          text.includes(
            search.toLowerCase()
          )

          &&

          (
            statusFilter==="Alle"
            ||
            app.status===statusFilter
          )

        );


      });


    },[
      items,
      search,
      statusFilter
    ]);






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



 const id =
 active.id.toString();


 const status =
 over.id.toString();



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

onDragStart={
event=>{
setActive(
items.find(
x=>x.id===event.active.id
)
)
}
}

onDragEnd={
handleDragEnd
}

>



<div className="
mb-8
rounded-3xl
bg-white
p-5
">


<input

value={search}

onChange={
e=>setSearch(
e.target.value
)
}

placeholder="🔎 Bewerbungen suchen"

className="
w-full
rounded-xl
border
px-4
py-3
"

/>


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
filteredItems.filter(
app=>app.status===column
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


