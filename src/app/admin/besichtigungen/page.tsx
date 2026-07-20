import { createAdminClient } from "@/lib/supabase/admin";
import ViewingsDashboard from "@/components/admin/viewings/ViewingsDashboard";


export default async function BesichtigungenPage(){


  const supabase =
    createAdminClient();





  const { data:viewings, error } =
    await supabase
      .from("viewings")
      .select(`
        id,
        application_id,
        viewing_date,
        viewing_time,
        status,
        created_at,

        application:applications(
          id,
          apartment_title,
          address,
          city,
          user_id
        )

      `)
      .order(
        "viewing_date",
        {
          ascending:true
        }
      );





  if(error){

    console.error(
      "VIEWINGS ERROR:",
      error
    );

  }






  const userIds =

    viewings
      ?.map(
        viewing => {

          const application =
            Array.isArray(
              viewing.application
            )
            ?
            viewing.application[0]
            :
            viewing.application;


          return application?.user_id;

        }
      )
      .filter(Boolean)
      || [];







  const { data:profiles } =

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








  const list =

    viewings?.map(

      viewing => {


        const application =

          Array.isArray(
            viewing.application
          )

          ?

          viewing.application[0]

          :

          viewing.application;




        return {


          ...viewing,


          application,



          customer:

            profiles?.find(
              profile =>
                profile.id ===
                application?.user_id
            )
            ||
            null



        };


      }

    )

    ||

    [];









  return (

    <main className="
      min-h-screen
      bg-slate-50
      p-8
    ">


      <div className="
        mx-auto
        max-w-[1400px]
      ">


        <div className="mb-8">


          <h1 className="
            text-3xl
            font-bold
            text-slate-900
          ">

            Besichtigungen

          </h1>



          <p className="
            mt-2
            text-slate-600
          ">

            Alle geplanten Wohnungsbesichtigungen im Überblick.

          </p>


        </div>





        <ViewingsDashboard

          viewings={list}

        />




      </div>


    </main>

  );


}


