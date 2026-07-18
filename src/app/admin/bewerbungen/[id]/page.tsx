import { createAdminClient } from "@/lib/supabase/admin";
import { getProfile } from "@/services/admin/get-profile";
import { updateApplicationStatus } from "@/services/admin/update-application";
import { updateApplicationNote } from "@/services/admin/update-application-note";
import { redirect } from "next/navigation";
import Link from "next/link";
import CopyApplicationText from "@/components/admin/CopyApplicationText";


async function updateStatus(formData: FormData){

  "use server";

  const id =
    formData.get("id") as string;

  const status =
    formData.get("status") as string;


  await updateApplicationStatus(
    id,
    status
  );


  redirect(`/admin/bewerbungen/${id}`);

}




async function updateNote(formData: FormData){

  "use server";

  const id =
    formData.get("id") as string;


  const notes =
    formData.get("notes") as string;


  await updateApplicationNote(
    id,
    notes
  );


  redirect(`/admin/bewerbungen/${id}`);

}





export default async function BewerbungDetailPage({
  params
}:{
  params: Promise<{
    id:string
  }>
}){


  const { id } =
    await params;


  const supabase =
    createAdminClient();



  const { data:application } =
    await supabase
      .from("applications")
      .select("*")
      .eq(
        "id",
        id
      )
      .single();




  if(!application){

    return (

      <main className="min-h-screen bg-slate-50 p-8">

        Bewerbung nicht gefunden

      </main>

    );

  }




  const profile =
    await getProfile(
      application.user_id
    );





  const { data:viewing } =
    await supabase
      .from("viewings")
      .select("*")
      .eq(
        "application_id",
        application.id
      )
      .maybeSingle();





  const { data:history } =
    await supabase
      .from("application_history")
      .select("*")
      .eq(
        "application_id",
        application.id
      )
      .order(
        "created_at",
        {
          ascending:false
        }
      );





  const statuses = [
    "Vorbereitung",
    "Beworben",
    "Antwort erhalten",
    "Besichtigung",
    "Zusage",
    "Absage"
  ];




  return (

    <main className="min-h-screen bg-slate-50 p-8">


      <div className="mx-auto max-w-6xl space-y-6">



        <Link
          href="/admin/bewerbungen"
          className="text-teal-600"
        >
          ← Alle Bewerbungen
        </Link>




        <section className="rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-bold">

            {application.apartment_title || "Wohnung"}

          </h1>


          <p className="mt-2 text-slate-600">

            {application.address}

            {application.city &&
              `, ${application.city}`
            }

          </p>



          {
            application.listing_url && (

              <a
                href={application.listing_url}
                target="_blank"
                className="mt-5 inline-block rounded-xl border px-5 py-3"
              >
                Inserat öffnen
              </a>

            )
          }



          <Link
            href={`/admin/bewerbungen/${application.id}/besichtigung`}
            className="mt-5 block rounded-xl bg-teal-600 px-5 py-3 text-center text-white"
          >
            Besichtigung erstellen
          </Link>


        </section>





        <section className="rounded-3xl bg-white p-8 shadow">

          <h2 className="text-xl font-bold">
            Bewerberprofil
          </h2>


          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <Info label="Name" value={profile?.full_name}/>
            <Info label="E-Mail" value={profile?.email}/>
            <Info label="Stadt" value={profile?.city}/>
            <Info label="Budget" value={`${profile?.budget ||"-"} €`}/>
            <Info label="Zimmer" value={profile?.rooms}/>
            <Info label="Einzug" value={profile?.move_in_date}/>
            <Info label="Haushalt" value={profile?.household}/>
            <Info label="Einkommen" value={`${profile?.income|| "-"} €`}/>
            <Info label="Haustiere" value={profile?.pets}/>
            <Info label="Raucher" value={profile?.smoker}/>

          </div>


          <Link
            href={`/admin/kunden/${application.user_id}`}
            className="mt-6 inline-block rounded-xl border px-5 py-3"
          >
            Kundenakte öffnen
          </Link>


        </section>





        {
          profile?.application_text && (

            <section className="rounded-3xl bg-white p-8 shadow">

              <h2 className="text-xl font-bold">
                Bewerbungstext
              </h2>


              <textarea
                readOnly
                value={profile.application_text}
                className="mt-5 min-h-48 w-full rounded-xl border p-4"
              />


              <CopyApplicationText
                text={profile.application_text}
              />

            </section>

          )
        }






        {
          viewing && (

            <section className="rounded-3xl bg-white p-8 shadow">

              <h2 className="text-xl font-bold">
                Besichtigung
              </h2>


              <div className="mt-5 space-y-2">

                <p>
                  Datum: {viewing.viewing_date}
                </p>

                <p>
                  Uhrzeit: {viewing.viewing_time}
                </p>

                <p>
                  Status: {viewing.status}
                </p>

              </div>


            </section>

          )
        }






        <section className="rounded-3xl bg-white p-8 shadow">

          <h2 className="text-xl font-bold">
            Status ändern
          </h2>


          <form
            action={updateStatus}
            className="mt-5 flex gap-4"
          >

            <input
              type="hidden"
              name="id"
              value={application.id}
            />


            <select
              name="status"
              defaultValue={application.status}
              className="rounded-xl border px-4 py-3"
            >

              {
                statuses.map(status=>(

                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>

                ))
              }

            </select>


            <button className="rounded-xl bg-teal-600 px-6 py-3 text-white">
              Speichern
            </button>


          </form>


        </section>






        <section className="rounded-3xl bg-white p-8 shadow">


          <h2 className="text-xl font-bold">
            Verlauf
          </h2>


          <div className="mt-5 space-y-4">


            {
              history?.map(item=>(

                <div
                  key={item.id}
                  className="rounded-xl bg-slate-50 p-4"
                >

                  <p className="font-semibold">
                    Status geändert
                  </p>


                  <p className="text-slate-600">
                    {item.old_status}
                    {" → "}
                    {item.new_status}
                  </p>


                  <p className="mt-2 text-xs text-slate-400">

                    {
                      new Date(
                        item.created_at
                      ).toLocaleString("de-DE")
                    }

                  </p>


                </div>

              ))
            }


            {
              (!history || history.length === 0) && (

                <p className="text-slate-500">
                  Noch keine Änderungen vorhanden.
                </p>

              )
            }


          </div>


        </section>







        <section className="rounded-3xl bg-white p-8 shadow">


          <h2 className="text-xl font-bold">
            Interne Notizen
          </h2>


          <form
            action={updateNote}
            className="mt-5 space-y-4"
          >

            <input
              type="hidden"
              name="id"
              value={application.id}
            />


            <textarea
              name="notes"
              defaultValue={application.notes || ""}
              className="min-h-32 w-full rounded-xl border p-4"
            />


            <button className="rounded-xl bg-teal-600 px-6 py-3 text-white">
              Notiz speichern
            </button>


          </form>


        </section>



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

  );

}
