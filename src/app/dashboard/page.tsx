﻿import DashboardShell from "@/components/layout/DashboardShell";
import CurrentPlanCard from "@/components/plans/CurrentPlanCard";
import RentalJourney from "@/components/dashboard/RentalJourney";
import NextTasks from "@/components/dashboard/NextTasks";

import { createClient } from "@/lib/supabase/server";


export default async function DashboardPage(){


  const supabase = await createClient();


  const {
    data:{
      user
    }
  } = await supabase.auth.getUser();



  if(!user){

    return null;

  }



  const {
    data:profile
  } = await supabase
    .from("profiles")
    .select("*")
    .eq(
      "id",
      user.id
    )
    .maybeSingle();



  const {
    data:searchProfile
  } = await supabase
    .from("search_profiles")
    .select("*")
    .eq(
      "user_id",
      user.id
    )
    .maybeSingle();



  const {
    data:documents
  } = await supabase
    .from("documents")
    .select("*")
    .eq(
      "user_id",
      user.id
    );




  return (

    <DashboardShell>

      <div className="space-y-6">


        <div>

          <h1 className="text-3xl font-bold text-slate-900">

            Willkommen bei MietGate

          </h1>


          <p className="mt-2 text-slate-500">

            Wir begleiten dich Schritt für Schritt zur neuen Wohnung.

          </p>

        </div>



        <CurrentPlanCard />



        <div className="grid gap-6 lg:grid-cols-2">


          <RentalJourney />


          <NextTasks
            profile={profile}
            searchProfile={searchProfile}
            documents={documents || []}
          />


        </div>



      </div>

    </DashboardShell>

  );


}


