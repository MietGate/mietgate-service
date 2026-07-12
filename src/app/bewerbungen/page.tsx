"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";


export default function BewerbungenPage(){

  const [applications,setApplications] = useState<any[]>([]);


  async function loadApplications(){

    const supabase=createClient();

    const {
      data:{
        user
      }
    } = await supabase.auth.getUser();


    if(user){

      const {data}=await supabase
      .from("applications")
      .select("*")
      .eq("user_id",user.id)
      .order("created_at",{ascending:false});


      setApplications(data || []);

    }

  }



  useEffect(()=>{

    loadApplications();

  },[]);



  async function updateStatus(
    id:string,
    status:string
  ){

    const supabase=createClient();


    await supabase
    .from("applications")
    .update({
      status
    })
    .eq("id",id);


    loadApplications();

  }



  return (

    <main className="min-h-screen bg-slate-50 p-6">

      <div className="mx-auto max-w-5xl">


        <h1 className="text-3xl font-bold">
          Deine Bewerbungen
        </h1>



        <div className="mt-8 space-y-5">


        {applications.map((app)=>(


          <div
          key={app.id}
          className="rounded-3xl bg-white p-6 shadow"
          >


            <h2 className="text-xl font-bold">
              {app.apartment_title}
            </h2>


            <p>
              {app.city}
            </p>


            <p className="mt-2 text-sm text-slate-500">
              {app.address}
            </p>



            <select

            value={app.status}

            onChange={(e)=>
              updateStatus(
                app.id,
                e.target.value
              )
            }

            className="mt-5 rounded-xl border p-3"

            >


              <option>
                Vorbereitung
              </option>


              <option>
                Gesendet
              </option>


              <option>
                Antwort erhalten
              </option>


              <option>
                Besichtigung
              </option>


              <option>
                Abgeschlossen
              </option>


            </select>



          </div>


        ))}


        </div>


      </div>


    </main>

  );

}