import DashboardShell from "@/components/layout/DashboardShell";
import PersonalDataForm from "./components/PersonalDataForm";
import { createClient } from "@/lib/supabase/server";

import {
  User,
  ShieldCheck,
} from "lucide-react";


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


      <div className="space-y-8">



        <div>


          <h1 className="text-3xl font-bold text-slate-900">
            Mein Profil
          </h1>


          <p className="mt-2 text-slate-600">
            Verwalte deine persönlichen Daten für deine Mietbewerbungen.
          </p>


        </div>







        <div
          className="
          grid
          gap-5
          md:grid-cols-2
          "
        >



          <div
            className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            "
          >


            <div className="flex items-center gap-3">


              <div
                className="
                rounded-xl
                bg-teal-50
                p-3
                "
              >

                <User
                  className="text-teal-600"
                  size={22}
                />

              </div>



              <div>

                <h2 className="font-semibold">
                  Persönliche Daten
                </h2>

                <p className="text-sm text-slate-500">
                  Deine Bewerberinformationen
                </p>

              </div>


            </div>


          </div>






          <div
            className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            "
          >


            <div className="flex items-center gap-3">


              <div
                className="
                rounded-xl
                bg-teal-50
                p-3
                "
              >

                <ShieldCheck
                  className="text-teal-600"
                  size={22}
                />

              </div>




              <div>

                <h2 className="font-semibold">
                  Bewerbungsprofil
                </h2>

                <p className="text-sm text-slate-500">
                  Diese Daten helfen Vermietern
                </p>

              </div>


            </div>


          </div>



        </div>









        <div
          className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          sm:p-8
          "
        >


          <PersonalDataForm
            profile={profile}
          />


        </div>





      </div>


    </DashboardShell>

  );


}