"use client";

import { useMemo, useState } from "react";


type Props = {
  viewings:any[];
};



const statuses = [
  "geplant",
  "bestätigt",
  "abgesagt",
  "erledigt"
];



const timeFilters = [
  "Alle",
  "Heute",
  "Diese Woche"
];





export default function ViewingsDashboard({
  viewings
}:Props){


  const [
    search,
    setSearch
  ] = useState("");



  const [
    statusFilter,
    setStatusFilter
  ] = useState("Alle");



  const [
    timeFilter,
    setTimeFilter
  ] = useState("Alle");





  const filtered = useMemo(()=>{


    return viewings.filter(viewing=>{


      const text = `

        ${viewing.application?.apartment_title || ""}

        ${viewing.application?.city || ""}

        ${viewing.application?.address || ""}

        ${viewing.customer?.full_name || ""}

        ${viewing.customer?.email || ""}

      `.toLowerCase();




      const matchesSearch =
        text.includes(
          search.toLowerCase()
        );




      const matchesStatus =
        statusFilter === "Alle"
        ||
        viewing.status === statusFilter;





      let matchesTime = true;



      if(timeFilter !== "Alle"){


        const date =
          new Date(
            viewing.viewing_date
          );


        const today =
          new Date();


        if(timeFilter==="Heute"){


          matchesTime =
            date.toDateString()
            ===
            today.toDateString();


        }




        if(timeFilter==="Diese Woche"){


          const week =
            new Date();


          week.setDate(
            today.getDate()+7
          );


          matchesTime =
            date >= today
            &&
            date <= week;


        }



      }





      return (

        matchesSearch
        &&
        matchesStatus
        &&
        matchesTime

      );


    });



  },[
    viewings,
    search,
    statusFilter,
    timeFilter
  ]);







  async function updateStatus(
    id:string,
    status:string
  ){


    await fetch(
      "/api/admin/viewings",
      {
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({

          id,
          status

        })
      }
    );


    window.location.reload();


  }







  return (

    <div className="space-y-8">





      <div className="
        grid
        gap-5
        md:grid-cols-4
      ">


        <StatCard
          title="Gesamt"
          value={viewings.length}
        />


        <StatCard
          title="Geplant"
          value={
            viewings.filter(
              v=>v.status==="geplant"
            ).length
          }
        />


        <StatCard
          title="Bestätigt"
          value={
            viewings.filter(
              v=>v.status==="bestätigt"
            ).length
          }
        />


        <StatCard
          title="Offen"
          value={
            viewings.filter(
              v=>v.status!=="erledigt"
            ).length
          }
        />


      </div>







      <div className="
        rounded-3xl
        bg-white
        p-5
        border
        shadow-sm
      ">


        <div className="
          grid
          gap-4
          md:grid-cols-3
        ">


          <input

            value={search}

            onChange={
              e=>setSearch(
                e.target.value
              )
            }

            placeholder="Besichtigung suchen..."

            className="
              rounded-xl
              border
              px-4
              py-3
            "

          />




          <select

            value={statusFilter}

            onChange={
              e=>setStatusFilter(
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
              statuses.map(status=>(

                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>

              ))
            }


          </select>






          <select

            value={timeFilter}

            onChange={
              e=>setTimeFilter(
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

            {
              timeFilters.map(filter=>(

                <option
                  key={filter}
                >
                  {filter}
                </option>

              ))
            }


          </select>


        </div>


      </div>








      <div className="space-y-5">


        {
          filtered.map(viewing=>(


            <div
              key={viewing.id}
              className="
                rounded-3xl
                bg-white
                p-6
                border
                shadow-sm
              "
            >



              <div className="
                flex
                justify-between
                gap-5
              ">


                <div>


                  <h2 className="
                    text-xl
                    font-bold
                  ">

                    {
                      viewing.application
                      ?.apartment_title
                      ||
                      "Wohnung"
                    }

                  </h2>



                  <p>
                    {viewing.application?.city}
                  </p>


                  <p>
                    {viewing.customer?.full_name}
                  </p>


                </div>




                <select

                  value={viewing.status}

                  onChange={
                    e=>
                    updateStatus(
                      viewing.id,
                      e.target.value
                    )
                  }

                  className="
                    rounded-xl
                    border
                    px-3
                    py-2
                    h-fit
                  "

                >

                  {
                    statuses.map(status=>(

                      <option
                        key={status}
                      >
                        {status}
                      </option>

                    ))
                  }


                </select>



              </div>







              <div className="
                mt-5
                grid
                gap-4
                md:grid-cols-3
              ">


                <Info
                  label="Datum"
                  value={viewing.viewing_date}
                />


                <Info
                  label="Uhrzeit"
                  value={viewing.viewing_time}
                />


                <Info
                  label="Adresse"
                  value={viewing.application?.address}
                />


              </div>




            </div>


          ))
        }


      </div>



    </div>

  );

}







function StatCard({
 title,
 value
}:{
 title:string;
 value:number;
}){


 return (

  <div className="
    rounded-3xl
    bg-white
    p-5
    border
  ">

    <p className="text-sm text-slate-500">
      {title}
    </p>


    <p className="text-3xl font-bold mt-2">
      {value}
    </p>


  </div>

 );

}







function Info({
 label,
 value
}:{
 label:string;
 value:any;
}){


 return (

  <div>

    <p className="text-sm text-slate-500">
      {label}
    </p>

    <p className="font-semibold">
      {value || "-"}
    </p>


  </div>

 );

}



