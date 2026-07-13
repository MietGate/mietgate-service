"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";

import DashboardShell from "@/components/layout/DashboardShell";
import Card from "@/components/ui/Card";
import Progress from "@/components/ui/Progress";
import Badge from "@/components/ui/Badge";

import {
  FileText,
  Home,
  ClipboardCheck,
  ExternalLink,
} from "lucide-react";


export default function DashboardPage() {

  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [documents, setDocuments] = useState(0);
  const [applications, setApplications] = useState(0);

  const [viewing, setViewing] = useState<any>(null);



  useEffect(() => {

    async function loadUser(){

      const supabase = createClient();


      const {
        data:{
          user
        }
      } = await supabase.auth.getUser();



      if(!user) return;



      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();



      if(data){

        setName(data.full_name || "");


        const fields = [
          data.city,
          data.budget,
          data.rooms,
          data.move_in_date,
          data.household,
          data.income
        ];


        const filled = fields.filter(Boolean).length;


        setProgress(
          Math.round((filled / fields.length) * 100)
        );


        setCompleted(data.profile_completed);

      }





      const { data: docs } = await supabase
        .from("documents")
        .select("id")
        .eq("user_id", user.id);


      setDocuments(docs?.length || 0);






      const { data: apps } = await supabase
        .from("applications")
        .select("id")
        .eq("user_id", user.id);


      setApplications(apps?.length || 0);







      const { data: viewingData } = await supabase
        .from("viewings")
        .select("*")
        .eq("user_id", user.id)
        .order("viewing_date", {
          ascending:true
        })
        .limit(1)
        .single();



      if(viewingData){

        setViewing(viewingData);

      }


    }



    loadUser();


  },[]);







  async function updateViewingStatus(status:string){

    const supabase = createClient();


    if(!viewing) return;



    await supabase
      .from("viewings")
      .update({
        status
      })
      .eq("id", viewing.id);



    setViewing({
      ...viewing,
      status
    });


  }







  return (

    <DashboardShell>


      <motion.div

        initial={{
          opacity:0,
          y:20
        }}

        animate={{
          opacity:1,
          y:0
        }}

      >

        <h1 className="text-3xl font-bold text-slate-900">
          Hallo {name || "MietGate Nutzer"}
        </h1>


        <p className="mt-2 text-slate-600">
          Wir kümmern uns um deine Mietbewerbungen.
        </p>


      </motion.div>







      <div className="mt-8 grid gap-6 md:grid-cols-3">



        <Card className="p-6">


          <div className="flex items-center justify-between">


            <Home className="text-teal-600"/>


            <Badge variant={completed ? "success" : "warning"}>
              {completed ? "Fertig" : "Offen"}
            </Badge>


          </div>



          <h3 className="mt-5 font-semibold text-slate-700">
            Suchprofil
          </h3>



          <div className="mt-4">
            <Progress value={progress}/>
          </div>


        </Card>






        <Card className="p-6">


          <FileText className="text-teal-600"/>


          <h3 className="mt-5 font-semibold text-slate-700">
            Dokumente
          </h3>



          <p className="mt-3 text-3xl font-bold text-slate-900">
            {documents}
          </p>


          <p className="text-sm text-slate-500">
            Unterlagen vorhanden
          </p>


        </Card>







        <Card className="p-6">


          <ClipboardCheck className="text-teal-600"/>


          <h3 className="mt-5 font-semibold text-slate-700">
            Bewerbungen
          </h3>


          <p className="mt-3 text-3xl font-bold text-slate-900">
            {applications}
          </p>


          <p className="text-sm text-slate-500">
            laufende Bewerbungen
          </p>


        </Card>



      </div>









      <Card className="mt-8 p-8">


        <h2 className="text-xl font-bold text-slate-900">
          Deine nächsten Schritte
        </h2>



        <div className="mt-5 space-y-3 text-slate-600">


          <p>
            {progress === 100
              ? "✓ Suchprofil abgeschlossen"
              : "→ Suchprofil vervollständigen"}
          </p>



          <p>
            {documents > 0
              ? "✓ Dokumente vorhanden"
              : "→ Dokumente hochladen"}
          </p>




          <p>
            {applications > 0
              ? "✓ Bewerbungen laufen"
              : "→ MietGate startet Bewerbungen"}
          </p>



        </div>


      </Card>









      {viewing && (


      <Card className="mt-8 p-8">


        <h2 className="text-xl font-bold text-slate-900">
          🏠 Nächste Besichtigung
        </h2>




        <p className="mt-5 text-lg font-semibold">
          {viewing.title}
        </p>



        <p className="text-slate-500">
          {viewing.address}
        </p>


        <p className="text-slate-500">
          {viewing.city}
        </p>





        <div className="mt-5">


          <p>
            📅 {new Date(viewing.viewing_date).toLocaleDateString("de-DE")}
          </p>


          <p>
            🕒 {viewing.viewing_time.slice(0,5)} Uhr
          </p>


        </div>







        <div className="mt-5">


          <Badge

            variant={
              viewing.status === "accepted"

              ? "success"

              :

              viewing.status === "declined"

              ? "danger"

              :

              "warning"
            }

          >

            {
              viewing.status === "accepted"

              ?

              "Zugesagt"

              :

              viewing.status === "declined"

              ?

              "Abgesagt"

              :

              "Rückmeldung ausstehend"
            }


          </Badge>


        </div>








        <div className="mt-8 flex flex-wrap gap-4">



          <a

            href={viewing.listing_url}

            target="_blank"

            className="rounded-xl border px-5 py-3 font-medium hover:bg-slate-50 flex items-center gap-2"

          >

            Wohnung ansehen

            <ExternalLink size={18}/>

          </a>







          <button

            onClick={() => updateViewingStatus("accepted")}

            className="rounded-xl bg-teal-600 px-5 py-3 font-medium text-white hover:bg-teal-700"

          >

            Termin zusagen

          </button>







          <button

            onClick={() => updateViewingStatus("declined")}

            className="rounded-xl bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"

          >

            Termin absagen

          </button>




        </div>


      </Card>


      )}





    </DashboardShell>

  );

}