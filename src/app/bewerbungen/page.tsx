"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";



export default function BewerbungenPage(){


  const [applications,setApplications] =
    useState<any[]>([]);




  async function loadApplications(){


    const supabase =
      createClient();



    const {
      data:{
        user
      }
    } =
    await supabase.auth.getUser();



    if(!user) return;
    console.log("AKTUELLER USER:", user.id);




    const {
      data
    } =
    await supabase
      .from("applications")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .order(
        "created_at",
        {
          ascending:false
        }
      );



    setApplications(data || []);


  }





  useEffect(()=>{

    loadApplications();

  },[]);





  return (


    <main className="min-h-screen bg-slate-50 p-6">


      <div className="mx-auto max-w-5xl">



        <h1 className="text-3xl font-bold text-slate-900">

          Deine Bewerbungen

        </h1>




        <div className="mt-8 space-y-5">



        {
          applications.map((app)=>(


            <Link

              key={app.id}

              href={`/bewerbungen/${app.id}`}

            >


              <div

                className="
                rounded-3xl
                bg-white
                p-6
                shadow
                hover:shadow-xl
                transition
                cursor-pointer
                "

              >



                <h2 className="text-xl font-bold">

                  {app.apartment_title || "Wohnung"}

                </h2>



                <p className="mt-2">

                  {app.city}

                </p>



                <p className="text-sm text-slate-500">

                  {app.address}

                </p>




                <div className="mt-5">


                  <span

                    className="
                    inline-flex
                    rounded-full
                    bg-teal-50
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-teal-700
                    "

                  >

                    {app.status}

                  </span>


                </div>




              </div>


            </Link>


          ))
        }



        {
          applications.length === 0 &&

          <div className="
          rounded-3xl
          bg-white
          p-8
          text-center
          text-slate-500
          ">

            Noch keine Bewerbungen vorhanden.

          </div>

        }



        </div>


      </div>


    </main>


  );


}