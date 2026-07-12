"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";


export default function DashboardPage() {

  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [documents, setDocuments] = useState(0);


  useEffect(() => {

    async function loadUser(){

      const supabase = createClient();


      const {
        data:{
          user
        }
      } = await supabase.auth.getUser();


      if(user){


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


      }

    }


    loadUser();


  },[]);



  return (

    <main className="min-h-screen bg-slate-50 px-6 py-12">


      <div className="mx-auto max-w-6xl">


        <motion.div
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        >


          <h1 className="text-4xl font-bold text-slate-900">
            Hallo {name || "??"}
          </h1>


          <p className="mt-3 text-slate-600">
            Willkommen bei MietGate. Wir kümmern uns um deine Mietbewerbungen.
          </p>


        </motion.div>



        <div className="mt-10 grid gap-6 md:grid-cols-3">


          <DashboardCard
          title="Suchprofil"
          value={`${progress}%`}
          text={completed ? "Abgeschlossen" : "Noch nicht abgeschlossen"}
          />


          <DashboardCard
          title="Dokumente"
          value={`${documents} / 5`}
          text="Unterlagen hochladen"
          />


          <DashboardCard
          title="Besichtigungen"
          value="0 / 3"
          text="Garantie Status"
          />


        </div>


        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">


          <h2 className="text-xl font-bold">
            Deine nächsten Schritte
          </h2>


          <div className="mt-5 space-y-3 text-slate-600">

            <p>✓ Suchprofil erstellen</p>

            <p>✓ Dokumente hochladen</p>

            <p>→ MietGate startet Bewerbungen</p>


          </div>


        </div>


      </div>


    </main>

  );

}



function DashboardCard({
  title,
  value,
  text
}:{
  title:string;
  value:string;
  text:string;
}){


return (

<motion.div

whileHover={{scale:1.03}}

className="rounded-3xl bg-white p-6 shadow-sm"

>


<h3 className="font-semibold text-slate-700">
{title}
</h3>


<p className="mt-4 text-3xl font-bold text-teal-600">
{value}
</p>


<p className="mt-2 text-sm text-slate-500">
{text}
</p>


</motion.div>

)

}
