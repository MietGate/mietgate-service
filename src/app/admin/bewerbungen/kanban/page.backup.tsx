import { createAdminClient } from "@/lib/supabase/admin";
import ApplicationKanban from "@/components/admin/ApplicationKanban";


export default async function KanbanPage(){


  const supabase = createAdminClient();



  const { data: applications } =
    await supabase
      .from("applications")
      .select(`
        id,
        apartment_title,
        address,
        city,
        status,
        created_at,
        user_id
      `)
      .order(
        "created_at",
        {
          ascending:false
        }
      );





    console.log("KANBAN APPLICATIONS:", applications);

  const userIds =
    applications?.map(
      item => item.user_id
    ) || [];





  const { data: profiles } =
    await supabase
      .from("profiles")
      .select(`
        id,
        full_name,
        email
      `)
      .in(
        "id",
        userIds
      );





  const list =
    applications?.map(
      application => ({

        ...application,

        customer:
          profiles?.find(
            profile =>
              profile.id === application.user_id
          ) || null

      })
    ) || [];







  return (

    <main className="min-h-screen bg-slate-50 p-8">


      <div className="mx-auto max-w-[1800px]">


        <h1 className="text-3xl font-bold text-slate-900">
          Bewerbungs-Pipeline
        </h1>


        <p className="mt-2 text-slate-600">
          Alle Bewerbungen im CRM Überblick.
        </p>




        <div className="mt-8">

          <ApplicationKanban
            applications={list}
          />

        </div>



      </div>


    </main>

  );


}




