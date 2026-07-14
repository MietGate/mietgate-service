import DashboardShell from "@/components/layout/DashboardShell";
import PersonalDataForm from "./components/PersonalDataForm";
import { createClient } from "@/lib/supabase/server";


export default async function ProfilPage() {


  const supabase = await createClient();



  const {
    data:{
      user
    }
  } = await supabase.auth.getUser();



  let profile = null;



  if(user){


    const {
      data
    } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();


    profile = data;

  }




  return (

    <DashboardShell>


      <div className="min-h-screen bg-slate-50 p-8">


        <h1 className="text-3xl font-bold text-slate-900">
          Mein Profil
        </h1>


        <p className="mt-2 text-slate-600">
          Verwalte deine persönlichen Daten und dein Suchprofil.
        </p>



        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">


          <PersonalDataForm
            profile={profile}
          />


        </div>


      </div>


    </DashboardShell>

  );

}