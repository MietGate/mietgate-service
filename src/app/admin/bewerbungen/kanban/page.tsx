import { createAdminClient } from "@/lib/supabase/admin";
import ApplicationDashboard from "@/components/admin/application/ApplicationDashboard";

export default async function KanbanPage(){


  const supabase = createAdminClient();




  const { data: applications, error } =
    await supabase
      .from("applications")
      .select(`
        id,
        apartment_title,
        address,
        city,
        status,
        notes,
        created_at,
        user_id
      `)
      .order(
        "created_at",
        {
          ascending:false
        }
      );




  if(error){

    console.error(
      "KANBAN APPLICATION ERROR:",
      error
    );

  }






  const userIds =
    applications
      ?.map(
        item => item.user_id
      )
      .filter(Boolean)
    ||
    [];






  const { data: profiles } =
    userIds.length > 0

    ?

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
      )

    :

    {
      data:[]
    };








  const applicationIds =
    applications
      ?.map(
        item => item.id
      )
    ||
    [];






  const { data:viewings } =
    applicationIds.length > 0

    ?

    await supabase
      .from("viewings")
      .select(`
        id,
        application_id,
        viewing_date,
        viewing_time,
        status
      `)
      .in(
        "application_id",
        applicationIds
      )

    :

    {
      data:[]
    };







  const { data:history } =
    applicationIds.length > 0

    ?

    await supabase
      .from("application_history")
      .select(`
        id,
        application_id,
        old_status,
        new_status,
        created_at
      `)
      .in(
        "application_id",
        applicationIds
      )
      .order(
        "created_at",
        {
          ascending:false
        }
      )

    :

    {
      data:[]
    };









  const list =

    applications?.map(

      application => ({


        ...application,



        customer:

          profiles?.find(
            profile =>
              profile.id === application.user_id
          )
          ||
          null,




        viewing:

          viewings?.find(
            viewing =>
              viewing.application_id === application.id
          )
          ||
          null,




        lastHistory:

          history?.find(
            item =>
              item.application_id === application.id
          )
          ||
          null



      })

    )

    ||

    [];









  return (

    <main
      className="
        min-h-screen
        bg-slate-50
        p-8
      "
    >


      <div
        className="
          mx-auto
          max-w-[1800px]
        "
      >



        <div className="mb-8">


          <h1
            className="
              text-3xl
              font-bold
              text-slate-900
            "
          >
            Bewerbungs-Pipeline
          </h1>



          <p
            className="
              mt-2
              text-slate-600
            "
          >
            Alle Bewerbungen im CRM Überblick.
          </p>



        </div>





        <ApplicationDashboard
  applications={list}
/>



      </div>


    </main>

  );

}