"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Progress from "@/components/ui/Progress";

import {
  FileText,
  Home,
  ClipboardCheck,
  CalendarDays,
  MapPin,
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






  async function updateViewingStatus(
    status:string
  ){


    if(!viewing)
      return;



    await fetch(
      "/api/viewings",
      {

        method:"PATCH",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          id:viewing.id,

          status

        })

      }
    );



    window.location.reload();


  }






  return (


    <DashboardShell>


      <div className="space-y-8">





        <div>


          <h1
            className="
            text-3xl
            font-bold
            text-slate-900
            sm:text-4xl
            "
          >
            Hallo {name || "MietGate Nutzer"} 👋
          </h1>



          <p className="mt-2 text-slate-600">
            Wir kümmern uns um deine Mietbewerbungen.
          </p>


        </div>








        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">


          <Card className="p-6">

            <Home className="text-teal-600"/>


            <h3 className="mt-4 font-semibold">
              Suchprofil
            </h3>


            <p className="mt-2 text-3xl font-bold">
              {progress}%
            </p>


            <div className="mt-3">
              <Progress value={progress}/>
            </div>


          </Card>







          <Card className="p-6">


            <FileText className="text-teal-600"/>


            <h3 className="mt-4 font-semibold">
              Dokumente
            </h3>


            <p className="mt-2 text-3xl font-bold">
              {documents}
            </p>


          </Card>







          <Card className="p-6">


            <ClipboardCheck className="text-teal-600"/>


            <h3 className="mt-4 font-semibold">
              Bewerbungen
            </h3>


            <p className="mt-2 text-3xl font-bold">
              {applications}
            </p>


          </Card>




        </div>








        {viewing && (


          <Card className="p-6 sm:p-8">


            <div className="flex items-center gap-3">

              <CalendarDays className="text-teal-600"/>


              <h2 className="text-xl font-bold">
                Nächste Besichtigung
              </h2>


            </div>







            <div className="mt-6">


              <h3 className="text-xl font-bold">
                {viewing.title}
              </h3>




              <p className="mt-2 flex items-center gap-2 text-slate-500">

                <MapPin size={18}/>

                {viewing.address}, {viewing.city}

              </p>





              <p className="mt-4">
                📅 {viewing.viewing_date}
              </p>



              <p>
                🕒 {viewing.viewing_time}
              </p>



            </div>








            <div className="mt-6 flex flex-col gap-3 sm:flex-row">



              <button

                onClick={()=>
                  updateViewingStatus(
                    "bestätigt"
                  )
                }

                className="
                rounded-xl
                bg-teal-600
                px-5
                py-3
                text-white
                hover:bg-teal-700
                "

              >

                Termin bestätigen

              </button>








              <button

                onClick={()=>
                  updateViewingStatus(
                    "abgesagt"
                  )
                }

                className="
                rounded-xl
                bg-red-600
                px-5
                py-3
                text-white
                hover:bg-red-700
                "

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






      </div>


    </DashboardShell>


  );


}