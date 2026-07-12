import { getCustomerDetail } from "@/services/admin/customer-detail";


export default async function CustomerPage({
  params
}:{
  params: Promise<{
    id:string
  }>
}) {


  const { id } = await params;


  const customer = await getCustomerDetail(id);


  if(!customer){

    return (
      <div className="p-8">
        Kunde nicht gefunden
      </div>
    );

  }



  const {
    profile,
    documents,
    applications
  } = customer;



  return (

    <main className="min-h-screen bg-slate-50 p-8">


      <div className="mx-auto max-w-5xl space-y-6">


        <div className="rounded-3xl bg-white p-8 shadow">


          <h1 className="text-3xl font-bold">
            {profile.full_name || "Unbekannter Kunde"}
          </h1>


          <div className="mt-6 grid gap-4 md:grid-cols-2">


            <Info
            label="Stadt"
            value={profile.city}
            />


            <Info
            label="Budget"
            value={`${profile.budget || "-"} €`}
            />


            <Info
            label="Zimmer"
            value={profile.rooms}
            />


            <Info
            label="Einkommen"
            value={profile.income}
            />


            <Info
            label="Haushalt"
            value={profile.household}
            />


            <Info
            label="Einzug"
            value={profile.move_in_date}
            />


          </div>


        </div>




        <div className="rounded-3xl bg-white p-8 shadow">


          <h2 className="text-xl font-bold">
            Dokumente
          </h2>


          {
            documents.length === 0 ? (

              <p className="mt-4 text-slate-500">
                Keine Dokumente vorhanden
              </p>

            ) : (

              <div className="mt-4 space-y-3">

                {documents.map((doc:any)=>(

  <div
    key={doc.id}
    className="rounded-xl border p-4"
  >

    <div className="flex items-center justify-between">

      <div>

        <p className="font-semibold">
          {doc.document_type}
        </p>

        <p className="text-sm text-slate-500">
          Status: {doc.status}
        </p>

      </div>

      <a
        href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/documents/${doc.file_url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
      >
        Dokument öffnen
      </a>

    </div>

  </div>

))}

              </div>

            )
          }


        </div>





        <div className="rounded-3xl bg-white p-8 shadow">


          <h2 className="text-xl font-bold">
            Bewerbungen
          </h2>


          {
            applications.length === 0 ? (

              <p className="mt-4 text-slate-500">
                Keine Bewerbungen vorhanden
              </p>

            ) : (

              <div className="mt-4 space-y-3">

                {applications.map((app:any)=>(

                  <div
                  key={app.id}
                  className="rounded-xl border p-4"
                  >

                    <b>
                      {app.apartment_title}
                    </b>

                    <div>
                      {app.city}
                    </div>

                    <div>
                      Status: {app.status}
                    </div>

                  </div>

                ))}

              </div>

            )
          }


        </div>



      </div>


    </main>

  );

}




function Info({
 label,
 value
}:{
 label:string;
 value:any;
}){


return (

<div>

<p className="text-sm text-slate-500">
{label}
</p>

<p className="font-semibold">
{value || "-"}
</p>

</div>

)

}