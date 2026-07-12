import { createAdminClient } from "@/lib/supabase/admin";
import { getProfile } from "@/services/admin/get-profile";
import { updateApplicationStatus } from "@/services/admin/update-application";
import { updateApplicationNote } from "@/services/admin/update-application-note";
import { redirect } from "next/navigation";


async function updateStatus(formData: FormData){

  "use server";


  const id = formData.get("id") as string;
  const status = formData.get("status") as string;


  await updateApplicationStatus(
    id,
    status
  );


  redirect(`/admin/bewerbungen/${id}`);

}



async function updateNote(formData: FormData){

  "use server";


  const id = formData.get("id") as string;
  const notes = formData.get("notes") as string;


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


  const { id } = await params;


  const supabase = createAdminClient();


  const { data: application } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .single();



  if(!application){

    return (
      <main className="min-h-screen bg-slate-50 p-8">
        Bewerbung nicht gefunden
      </main>
    );

  }



  const profile = await getProfile(
    application.user_id
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

      <div className="mx-auto max-w-5xl space-y-6">



        <div className="rounded-3xl bg-white p-8 shadow">


          <h1 className="text-3xl font-bold">
            {application.apartment_title}
          </h1>


          <p className="mt-2 text-slate-600">
            {application.city}
          </p>


          <p className="mt-6">
            Adresse:
            <span className="ml-2 font-semibold">
              {application.address}
            </span>
          </p>


        </div>




        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="text-xl font-bold">
            Bewerber
          </h2>


          <div className="mt-5 grid gap-4 md:grid-cols-2">


            <Info
              label="Name"
              value={profile?.full_name || "-"}
            />


            <Info
              label="E-Mail"
              value={profile?.email || "-"}
            />


            <Info
              label="Stadt"
              value={profile?.city || "-"}
            />


            <Info
              label="Budget"
              value={
                profile?.budget
                ? `${profile.budget} €`
                : "-"
              }
            />


            <Info
              label="Zimmer"
              value={
                profile?.rooms
                ? String(profile.rooms)
                : "-"
              }
            />


            <Info
              label="Haushalt"
              value={profile?.household || "-"}
            />


          </div>


        </div>




        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="text-xl font-bold">
            Status ändern
          </h2>


          <form
          action={updateStatus}
          className="mt-4 flex gap-4"
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



            <button
            className="rounded-xl bg-teal-600 px-6 py-3 text-white"
            >
              Speichern
            </button>


          </form>


        </div>





        <div className="rounded-3xl bg-white p-8 shadow">


          <h2 className="text-xl font-bold">
            Notizen
          </h2>


          <form
          action={updateNote}
          className="mt-4 space-y-4"
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



            <button
            className="rounded-xl bg-teal-600 px-6 py-3 text-white"
            >
              Notiz speichern
            </button>


          </form>


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
  value:string;
}){

  return (

    <div>

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="font-semibold">
        {value}
      </p>

    </div>

  );

}