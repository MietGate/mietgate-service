"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Progress from "@/components/ui/Progress";

import {
  FileText,
  Home,
  ClipboardCheck,
} from "lucide-react";


export default function DashboardPage(){


  const [name,setName] = useState("");
  const [documents,setDocuments] = useState(0);
  const [applications,setApplications] = useState(0);
  const [progress,setProgress] = useState(0);

  const [viewing,setViewing] = useState<any>(null);



  useEffect(()=>{


    async function load(){


      const supabase = createClient();


      const {
        data:{
          user
        }
      } = await supabase.auth.getUser();



      if(!user) return;




      const {data:profile}=await supabase
        .from("profiles")
        .select("*")
        .eq("id",user.id)
        .single();



      if(profile){

        setName(profile.full_name || "");


        const fields=[
          profile.city,
          profile.budget,
          profile.rooms,
          profile.move_in_date,
          profile.household,
          profile.income
        ];


        const filled =
          fields.filter(Boolean).length;


        setProgress(
          Math.round(
            (filled / fields.length) * 100
          )
        );

      }





      const {data:docs}=await supabase
        .from("documents")
        .select("id")
        .eq("user_id",user.id);


      setDocuments(
        docs?.length || 0
      );





      const {data:apps}=await supabase
        .from("applications")
        .select("id")
        .eq("user_id",user.id);


      setApplications(
        apps?.length || 0
      );





      const {data:viewingData}=await supabase
        .from("viewings")
        .select(`
          id,
          title,
          address,
          city,
          listing_url,
          viewing_date,
          viewing_time,
          status
        `)
        .eq("user_id",user.id)
        .order("created_at",{
          ascending:false
        })
        .limit(1)
        .maybeSingle();



      setViewing(viewingData);



    }


    load();


  },[]);




  async function updateViewingStatus(status:string){


    if(!viewing) return;



    await fetch("/api/viewings",{

      method:"PATCH",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        viewingId:viewing.id,
        status

      })

    });



    window.location.reload();


  }





  return (

    <main className="min-h-screen bg-slate-50 p-8">


      <h1 className="text-3xl font-bold">
        Hallo {name || "MietGate Nutzer"}
      </h1>


      <p className="mt-2 text-slate-600">
        Wir kümmern uns um deine Mietbewerbungen.
      </p>



      <div className="mt-8 grid gap-6 md:grid-cols-3">


        <Card className="p-6">

          <Home className="text-teal-600"/>

          <h3 className="mt-4 font-semibold">
            Suchprofil
          </h3>

          <Progress value={progress}/>

        </Card>




        <Card className="p-6">

          <FileText className="text-teal-600"/>

          <h3 className="mt-4 font-semibold">
            Dokumente
          </h3>

          <p className="text-3xl font-bold">
            {documents}
          </p>

        </Card>




        <Card className="p-6">

          <ClipboardCheck className="text-teal-600"/>

          <h3 className="mt-4 font-semibold">
            Bewerbungen
          </h3>

          <p className="text-3xl font-bold">
            {applications}
          </p>

        </Card>


      </div>




      {viewing && (

      <Card className="mt-8 p-8">


        <h2 className="text-xl font-bold">
          🏠 Nächste Besichtigung
        </h2>



        <p className="mt-4 font-semibold">
          {viewing.title}
        </p>


        <p className="text-slate-500">
          {viewing.address}, {viewing.city}
        </p>


        <p className="mt-4">
          📅 {viewing.viewing_date}
        </p>


        <p>
          🕒 {viewing.viewing_time}
        </p>



        {viewing.listing_url && (

          <a
            href={viewing.listing_url}
            target="_blank"
            className="mt-5 inline-block rounded-xl border px-5 py-3"
          >
            Wohnung ansehen
          </a>

        )}



        <div className="mt-6 flex gap-4">


          <button
            onClick={()=>updateViewingStatus("accepted")}
            className="rounded-xl bg-teal-600 px-5 py-3 text-white"
          >
            Termin zusagen
          </button>



          <button
            onClick={()=>updateViewingStatus("declined")}
            className="rounded-xl bg-red-600 px-5 py-3 text-white"
          >
            Termin absagen
          </button>


        </div>



        <div className="mt-5">
  <Badge>
    {viewing.status}
  </Badge>
</div>


      </Card>

      )}


    </main>

  );


}