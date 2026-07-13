import { createAdminClient } from "@/lib/supabase/admin";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";


export default async function BesichtigungenPage() {

  const supabase = createAdminClient();


  const { data: viewings } = await supabase
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
      user_id,
      profiles:user_id (
        full_name,
        email
      )
    `)
    .order("viewing_date", {
      ascending: true
    });



  return (

    <div>


      <h1 className="text-3xl font-bold text-slate-900">
        Besichtigungen
      </h1>


      <p className="mt-2 text-slate-600">
        Übersicht aller geplanten Wohnungsbesichtigungen
      </p>



      <div className="mt-8 space-y-6">


        {viewings?.map((viewing:any)=>(


          <Card
            key={viewing.id}
            className="p-6"
          >


            <div className="flex flex-col gap-6 md:flex-row md:justify-between">



              <div>


                <h2 className="text-xl font-bold text-slate-900">
                  {viewing.title}
                </h2>



                <p className="mt-2 text-slate-600">
                  {viewing.address}, {viewing.city}
                </p>



                <div className="mt-5 rounded-xl bg-slate-50 p-4">


                  <p className="font-semibold">
                    Kunde
                  </p>


                  <p>
                    {viewing.profiles?.full_name || "-"}
                  </p>


                  <p className="text-slate-500">
                    {viewing.profiles?.email || "-"}
                  </p>


                </div>




                <div className="mt-5 space-y-2">


                  <p>
                    📅 {viewing.viewing_date}
                  </p>


                  <p>
                    🕒 {viewing.viewing_time}
                  </p>


                </div>




                <div className="mt-5">


                  <Badge
                    variant={
                      viewing.status === "accepted"
                      ? "success"
                      :
                      viewing.status === "declined"
                      ? "danger"
                      :
                      "warning"
                    }
                  >

                    {
                      viewing.status === "accepted"
                      ? "Zugesagt"
                      :
                      viewing.status === "declined"
                      ? "Abgesagt"
                      :
                      "Rückmeldung ausstehend"
                    }

                  </Badge>


                </div>


              </div>





              <div className="flex flex-col gap-3">


                {viewing.listing_url && (

                  <a
                    href={viewing.listing_url}
                    target="_blank"
                    className="rounded-xl border px-5 py-3 text-center hover:bg-slate-50"
                  >

                    Wohnung ansehen

                  </a>

                )}



                <a
                  href={`mailto:${viewing.profiles?.email}`}
                  className="rounded-xl bg-teal-600 px-5 py-3 text-center text-white hover:bg-teal-700"
                >

                  Kunde kontaktieren

                </a>



              </div>



            </div>


          </Card>


        ))}




        {!viewings?.length && (

          <Card className="p-8">

            Keine Besichtigungen vorhanden.

          </Card>

        )}



      </div>


    </div>

  );

}