import { createAdminClient } from "@/lib/supabase/admin";
import ApplicationCRM from "@/components/admin/ApplicationCRM";


export default async function AdminBewerbungenPage(){


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
          )

      })
    ) || [];





  return (

    <main className="min-h-screen bg-slate-50 p-8">


      <div className="mx-auto max-w-7xl">


        <h1 className="text-3xl font-bold text-slate-900">
          Bewerbungen
        </h1>


        <p className="mt-2 text-slate-600">
          Bewerbungen verwalten und bearbeiten.
        </p>



        <div className="mt-8">

          <ApplicationCRM
            applications={list}
          />

        </div>



      </div>


    </main>

  );


}
