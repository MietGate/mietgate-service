import { createAdminClient } from "@/lib/supabase/admin";
import NewViewingForm from "./NewViewingForm";
import Card from "@/components/ui/Card";


export default async function NeueBesichtigungPage(){


  const supabase = createAdminClient();



  const {data:customers}=await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      email
    `)
    .neq("role","admin")
    .order("created_at");




  return (

    <main className="min-h-screen bg-slate-50 p-8">


      <h1 className="text-3xl font-bold">
        Neue Besichtigung
      </h1>


      <p className="mt-2 text-slate-600">
        Besichtigung für einen Kunden eintragen.
      </p>



      <Card className="mt-8 p-8">


        <NewViewingForm
          customers={customers || []}
        />


      </Card>



    </main>

  );

}



