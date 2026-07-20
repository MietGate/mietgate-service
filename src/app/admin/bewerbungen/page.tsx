"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import DashboardShell from "@/components/layout/DashboardShell";
import Card from "@/components/ui/Card";


export default function BewerbungenPage(){

  const [applications,setApplications] =
    useState<any[]>([]);



  async function loadApplications(){

    const supabase = createClient();


    const {
      data:{
        user
      }
    } = await supabase.auth.getUser();



    if(!user) return;



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

    <DashboardShell>


      <div className="space-y-8">


        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Deine Bewerbungen
          </h1>


          <p className="mt-2 text-slate-600">
            Übersicht deiner Mietbewerbungen.
          </p>

        </div>





        <div className="space-y-5">


        {
          applications.map((app)=>(


            <Link
              key={app.id}
              href={`/bewerbungen/${app.id}`}
              className="block"
            >


              <Card
                className="
                cursor-pointer
                transition
                hover:shadow-lg
                "
              >


                <h2 className="text-xl font-bold text-slate-900">

                  {app.apartment_title || "Wohnung"}

                </h2>



                <p className="mt-2 text-slate-600">

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


              </Card>


            </Link>


          ))
        }




        {
          applications.length === 0 &&

          <Card>

            <p className="text-slate-500">
              Noch keine Bewerbungen vorhanden.
            </p>

          </Card>

        }


        </div>


      </div>


    </DashboardShell>

  );

}


