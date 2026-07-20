import { createAdminClient } from "@/lib/supabase/admin";
import NewViewingForm from "@/app/admin/besichtigungen/neu/NewViewingForm";
import Card from "@/components/ui/Card";


export default async function NeueBewerbungsBesichtigungPage({
  params,
}: {
  params: Promise<{
    id:string;
  }>;
}) {


  const { id } = await params;


  const supabase = createAdminClient();



  const { data: application } =
    await supabase
      .from("applications")
      .select(`
        id,
        user_id,
        apartment_title,
        address,
        city,
        listing_url
      `)
      .eq("id", id)
      .single();



  if(!application){

    return (
      <main className="min-h-screen bg-slate-50 p-8">
        Bewerbung nicht gefunden
      </main>
    );

  }




  const { data: customer } =
    await supabase
      .from("profiles")
      .select(`
        id,
        full_name,
        email
      `)
      .eq(
        "id",
        application.user_id
      )
      .single();




  return (

    <main className="min-h-screen bg-slate-50 p-8">


      <h1 className="text-3xl font-bold">
        Besichtigung erstellen
      </h1>


      <p className="mt-2 text-slate-600">
        Für diese Bewerbung einen Termin erstellen.
      </p>




      <Card className="mt-8 p-8">


        <div className="mb-6 rounded-xl bg-slate-50 p-5">


          <h2 className="font-bold">
            {application.apartment_title}
          </h2>


          <p>
            {application.address}, {application.city}
          </p>


          {
            application.listing_url && (

              <a
                href={application.listing_url}
                target="_blank"
                className="mt-3 inline-block text-teal-600"
              >
                Inserat öffnen
              </a>

            )
          }


        </div>



        <NewViewingForm
  customers={
    customer
    ? [customer]
    : []
  }
  applicationId={application.id}
  defaultValues={{
    user_id: application.user_id,
    title: application.apartment_title,
    address: application.address,
    city: application.city,
    listing_url: application.listing_url || "",
  }}
/>


      </Card>


    </main>

  );

}
