import { createAdminClient } from "@/lib/supabase/admin";
import ViewingCRM from "@/components/admin/ViewingCRM";


export default async function BesichtigungenPage() {


  const supabase = createAdminClient();



  const { data:viewings } = await supabase
    .from("viewings")
    .select(`
      id,
      title,
      address,
      city,
      listing_url,
      viewing_date,
      viewing_time,
      status,
      user_id
    `)
    .order(
      "viewing_date",
      {
        ascending:true
      }
    );




  const userIds =
    viewings?.map(
      item => item.user_id
    ) || [];





  const { data:profiles } =
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
    viewings?.map(
      viewing => ({

        ...viewing,

        customer:
          profiles?.find(
            profile =>
              profile.id === viewing.user_id
          )

      })
    ) || [];






  return (

    <main className="min-h-screen bg-slate-50 p-8">


      <div className="mx-auto max-w-7xl">


        <h1 className="text-3xl font-bold text-slate-900">
          Besichtigungen
        </h1>


        <p className="mt-2 text-slate-600">
          Verwaltung aller Kundentermine.
        </p>




        <div className="mt-8">

          <ViewingCRM
            viewings={list}
          />

        </div>



      </div>


    </main>

  );

}



