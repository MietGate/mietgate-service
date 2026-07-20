"use client";


import { useEffect, useState } from "react";

import DashboardShell from "@/components/layout/DashboardShell";

import {
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";


import { createClient } from "@/lib/supabase/client";




export default function KalenderPage(){


  const [viewings,setViewings] =
    useState<any[]>([]);


  const [loading,setLoading] =
    useState(true);




  useEffect(()=>{

    loadViewings();

  },[]);





  async function loadViewings(){


    const supabase = createClient();



    const {
      data:{
        user
      }
    } =
    await supabase.auth.getUser();



    if(!user){

      setLoading(false);
      return;

    }




    const {
      data
    } =
    await supabase
      .from("viewings")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .order(
        "viewing_date",
        {
          ascending:true
        }
      );



    setViewings(data || []);

    setLoading(false);


  }






  async function updateStatus(
    viewingId:string,
    status:string
  ){


    await fetch(
      "/api/viewings",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({

          viewingId,
          status

        })

      }
    );



    loadViewings();


  }





  return (

    <DashboardShell>


      <div className="space-y-8">



        <div>


          <h1 className="text-3xl font-bold text-slate-900">

            Mein Kalender

          </h1>



          <p className="mt-2 text-slate-600">

            Hier findest du deine Besichtigungstermine.

          </p>


        </div>






        <div className="
          rounded-3xl
          border
          bg-white
          p-6
          shadow-sm
        ">



          <div className="flex items-center gap-3">


            <CalendarDays
              className="text-teal-600"
              size={28}
            />


            <h2 className="text-xl font-semibold">

              Deine Termine

            </h2>


          </div>







          <div className="mt-6 space-y-5">


          {
            loading && (

              <p>

                Lade Termine...

              </p>

            )
          }




          {
            !loading &&
            viewings.length === 0 && (

              <div className="
                rounded-2xl
                bg-slate-50
                p-6
                text-slate-500
              ">

                Keine Besichtigungen vorhanden.

              </div>

            )
          }






          {
            viewings.map((viewing)=>(


              <div
                key={viewing.id}
                className="
                  rounded-2xl
                  bg-slate-50
                  p-6
                "
              >



                <h3 className="text-xl font-bold">

                  {viewing.title}

                </h3>




                <p className="mt-3 flex gap-2 text-slate-600">

                  <MapPin size={18}/>

                  {viewing.address},
                  {" "}
                  {viewing.city}

                </p>




                <p className="mt-3 flex gap-2 text-slate-600">

                  <CalendarDays size={18}/>

                  {viewing.viewing_date}

                </p>




                <p className="mt-3 flex gap-2 text-slate-600">

                  <Clock size={18}/>

                  {viewing.viewing_time}

                </p>
                {
  viewing.listing_url && (

    <a
      href={viewing.listing_url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        mt-5
        inline-flex
        items-center
        justify-center
        rounded-xl
        border
        border-slate-200
        bg-white
        px-5
        py-3
        font-medium
        text-slate-700
        hover:bg-slate-50
      "
    >

      Wohnung ansehen

    </a>

  )
}





                <p className="mt-4 font-semibold">

                  Status:

                  {" "}

                  {
                    viewing.status === "accepted"
                    ? "Zugesagt"
                    :
                    viewing.status === "declined"
                    ? "Abgelehnt"
                    :
                    "Offen"
                  }

                </p>






                {
                  viewing.status === "pending" && (

                    <div className="mt-5 flex gap-3">


                      <button
                        onClick={() =>
                          updateStatus(
                            viewing.id,
                            "accepted"
                          )
                        }
                        className="
                          rounded-xl
                          bg-teal-600
                          px-5
                          py-3
                          text-white
                        "
                      >

                        Zusagen

                      </button>





                      <button
                        onClick={() =>
                          updateStatus(
                            viewing.id,
                            "declined"
                          )
                        }
                        className="
                          rounded-xl
                          bg-red-50
                          px-5
                          py-3
                          text-red-600
                        "
                      >

                        Absagen

                      </button>


                    </div>

                  )
                }



              </div>


            ))
          }


          </div>



        </div>



      </div>


    </DashboardShell>

  );


}


