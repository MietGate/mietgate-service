import { createAdminClient } from "@/lib/supabase/admin";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ViewingActions from "@/components/admin/ViewingActions";


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
    .order("viewing_date",{
      ascending:true
    });




  const userIds =
    viewings?.map(
      item => item.user_id
    ) || [];




  const { data:profiles } = await supabase
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


      <h1 className="text-3xl font-bold text-slate-900">
        Besichtigungen
      </h1>


      <p className="mt-2 text-slate-600">
        Übersicht aller Wohnungsbesichtigungen
      </p>





      <div className="mt-8 space-y-6">


        {list.map((viewing:any)=>(


          <Card
            key={viewing.id}
            className="p-6"
          >



            <div className="flex flex-col gap-6 md:flex-row md:justify-between">


              <div>


                <h2 className="text-xl font-bold">
                  {viewing.title}
                </h2>


                <p className="text-slate-600">
                  {viewing.address}, {viewing.city}
                </p>




                <div className="mt-5 rounded-xl bg-white p-4">


                  <p className="font-semibold">
                    Kunde
                  </p>


                  <p>
                    {viewing.customer?.full_name || "-"}
                  </p>


                  <p className="text-slate-500">
                    {viewing.customer?.email || "-"}
                  </p>


                </div>





                <div className="mt-5">


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
                      viewing.status==="accepted"
                      ? "success"
                      :
                      viewing.status==="declined"
                      ? "danger"
                      :
                      "warning"
                    }
                  >

                    {
                      viewing.status==="accepted"
                      ? "Zugesagt"
                      :
                      viewing.status==="declined"
                      ? "Abgesagt"
                      :
                      "Offen"
                    }

                  </Badge>


                </div>



              </div>






              <div className="flex flex-col gap-3">


                {viewing.listing_url && (

                  <a
                    href={viewing.listing_url}
                    target="_blank"
                    className="rounded-xl border px-5 py-3 text-center"
                  >
                    Wohnung ansehen
                  </a>

                )}



                <a
                  href={`mailto:${viewing.customer?.email}`}
                  className="rounded-xl bg-teal-600 px-5 py-3 text-center text-white"
                >
                  Kunde kontaktieren
                </a>



                <ViewingActions
                  id={viewing.id}
                />


              </div>


            </div>


          </Card>


        ))}




        {!list.length && (

          <Card className="p-8">
            Keine Besichtigungen vorhanden.
          </Card>

        )}



      </div>


    </main>

  );

}