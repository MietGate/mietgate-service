"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";


export default function PersonalDataForm({
  profile,
}: {
  profile: any;
}) {


  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    full_name: profile?.full_name || "",
    phone: profile?.phone || "",
    city: profile?.city || "",
    budget: profile?.budget || "",
    rooms: profile?.rooms || "",
    move_in_date: profile?.move_in_date || "",
    household: profile?.household || "",
    income: profile?.income || "",

  });



  function updateField(
    key:string,
    value:string
  ){

    setForm({
      ...form,
      [key]:value
    });

  }




  async function saveProfile(){


    setLoading(true);


    const supabase = createClient();


    const {
      data:{
        user
      }
    } = await supabase.auth.getUser();



    if(!user){
      setLoading(false);
      return;
    }




    await supabase
      .from("profiles")
      .update(form)
      .eq("id", user.id);



    setLoading(false);


    window.location.reload();


  }





  return (

    <div className="space-y-5">


      <div>

        <label className="text-sm font-medium">
          Vollständiger Name
        </label>

        <input
          value={form.full_name}
          onChange={(e)=>updateField(
            "full_name",
            e.target.value
          )}
          className="mt-1 w-full rounded-xl border p-3"
        />

      </div>




      <div>

        <label className="text-sm font-medium">
          Telefon
        </label>

        <input
          value={form.phone}
          onChange={(e)=>updateField(
            "phone",
            e.target.value
          )}
          className="mt-1 w-full rounded-xl border p-3"
        />

      </div>




      <div>

        <label className="text-sm font-medium">
          Stadt
        </label>

        <input
          value={form.city}
          onChange={(e)=>updateField(
            "city",
            e.target.value
          )}
          className="mt-1 w-full rounded-xl border p-3"
        />

      </div>




      <div className="grid gap-4 md:grid-cols-2">


        <input
          placeholder="Budget"
          value={form.budget}
          onChange={(e)=>updateField(
            "budget",
            e.target.value
          )}
          className="rounded-xl border p-3"
        />


        <input
          placeholder="Zimmer"
          value={form.rooms}
          onChange={(e)=>updateField(
            "rooms",
            e.target.value
          )}
          className="rounded-xl border p-3"
        />


      </div>




      <div>

        <label className="text-sm font-medium">
          Einzugsdatum
        </label>

        <input
          type="date"
          value={form.move_in_date}
          onChange={(e)=>updateField(
            "move_in_date",
            e.target.value
          )}
          className="mt-1 w-full rounded-xl border p-3"
        />

      </div>




      <button
        onClick={saveProfile}
        disabled={loading}
        className="rounded-xl bg-teal-600 px-6 py-3 text-white hover:bg-teal-700"
      >

        {loading ? "Speichern..." : "Daten speichern"}

      </button>


    </div>

  );

}



