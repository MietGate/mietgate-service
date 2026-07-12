import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";


export default async function BewerbungenPage(){

  const supabase = createAdminClient();


  const { data: applications, error } = await supabase
    .from("applications")
    .select(`
      id,
      apartment_title,
      city,
      address,
      status,
      viewing_date,
      notes,
      created_at,
      user_id
    `)
    .order("created_at", {
      ascending:false
    });



  if(error){

    console.log(
      "ADMIN APPLICATIONS ERROR:",
      error
    );

  }



  return (

    <main className="min-h-screen bg-slate-50 p-8">

      <div className="mx-auto max-w-6xl">


        <h1 className="text-3xl font-bold">
          Bewerbungen
        </h1>


        <div className="mt-8 space-y-5">


        {
          !applications || applications.length === 0 ? (

            <div className="rounded-3xl bg-white p-8 shadow">

              Keine Bewerbungen vorhanden

            </div>

          ) : (


            applications.map((app)=>(


              <Link
              key={app.id}
              href={`/admin/bewerbungen/${app.id}`}
              className="block"
              >


                <div
                className="rounded-3xl bg-white p-6 shadow transition hover:shadow-lg"
                >


                  <div className="flex justify-between">


                    <div>

                      <h2 className="text-xl font-bold">
                        {app.apartment_title}
                      </h2>


                      <p className="text-slate-600">
                        {app.city}
                      </p>

                    </div>


                    <span className="rounded-full bg-teal-100 px-4 py-2 text-sm">
                      {app.status}
                    </span>


                  </div>



                  <div className="mt-4 text-sm text-slate-500">

                    {app.address}

                  </div>


                  {
                    app.notes && (

                      <div className="mt-3 rounded-xl bg-slate-50 p-3">

                        {app.notes}

                      </div>

                    )
                  }


                </div>


              </Link>


            ))

          )

        }


        </div>


      </div>


    </main>

  );

}