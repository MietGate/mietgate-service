import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";


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


      <h1 className="text-3xl font-bold text-slate-900">
        Admin Bewerbungen
      </h1>


      <p className="mt-2 text-slate-600">
        Alle Kundenbewerbungen verwalten.
      </p>




      <div className="mt-8 space-y-5">


        {
          list.map((application)=>(


            <Link

              key={application.id}

              href={`/admin/bewerbungen/${application.id}`}

              className="
                block
                rounded-3xl
                bg-white
                p-6
                shadow-sm
                hover:shadow-md
              "

            >


              <h2 className="text-xl font-bold">

                {application.apartment_title || "Wohnung"}

              </h2>



              <p className="mt-2 text-slate-600">

                {application.address},
                {" "}
                {application.city}

              </p>



              <div className="mt-4">


                <p>

                  Kunde:
                  {" "}
                  <span className="font-semibold">

                    {
                      application.customer?.full_name ||
                      application.customer?.email ||
                      "-"
                    }

                  </span>

                </p>



                <p className="text-sm text-slate-500">

                  Status:
                  {" "}
                  {application.status}

                </p>


              </div>



            </Link>


          ))
        }





        {
          list.length === 0 && (

            <div className="rounded-2xl bg-white p-8">

              Keine Bewerbungen vorhanden.

            </div>

          )
        }


      </div>


    </main>

  );

}



