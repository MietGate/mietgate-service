"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProfilPage() {

  const [userId, setUserId] = useState("");

  const [form, setForm] = useState({
    full_name:"",
    city:"",
    budget:"",
    rooms:"",
    move_in_date:"",
    household:"",
    income:"",
    pets:false,
    smoker:false,
  });


  useEffect(()=>{

    async function load(){

      const supabase=createClient();

      const {
        data:{
          user
        }
      }=await supabase.auth.getUser();


      if(user){

        setUserId(user.id);


        const {data}=await supabase
        .from("profiles")
        .select("*")
        .eq("id",user.id)
        .single();


        if(data){

          setForm({
            full_name:data.full_name || "",
            city:data.city || "",
            budget:data.budget || "",
            rooms:data.rooms || "",
            move_in_date:data.move_in_date || "",
            household:data.household || "",
            income:data.income || "",
            pets:data.pets || false,
            smoker:data.smoker || false,
          });

        }

      }

    }


    load();

  },[]);



 async function save(){

  const supabase=createClient();

  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: form.full_name,
      city: form.city,
      budget: Number(form.budget),
      rooms: Number(form.rooms),
      move_in_date: form.move_in_date,
      household: form.household,
      income: Number(form.income),
      pets: form.pets,
      smoker: form.smoker,
      profile_completed:
  !!(
    form.full_name &&
    form.city &&
    form.budget &&
    form.rooms &&
    form.move_in_date &&
    form.household &&
    form.income
  )
    })
    .eq("id", userId)
    .select();


  console.log("SAVE RESULT:", data, error);


  if(error){

    alert(error.message);

  } else {

    alert("Profil gespeichert");

  }

}

  return (

    <main className="min-h-screen bg-slate-50 p-6">

      <div className="mx-auto max-w-3xl bg-white rounded-3xl p-8 shadow">


        <h1 className="text-3xl font-bold">
          Dein Suchprofil
        </h1>


        <div className="mt-8 space-y-4">


          {[
            ["full_name","Name"],
            ["city","Stadt"],
            ["budget","Budget"],
            ["rooms","Zimmer"],
            ["move_in_date","Einzug"],
            ["household","Haushalt"],
            ["income","Einkommen"],
          ].map(([key,label])=>(

            <input
            key={key}
            placeholder={label}
            value={(form as any)[key]}
            onChange={(e)=>setForm({
              ...form,
              [key]:e.target.value
            })}
            className="w-full rounded-xl border p-3"
            />

          ))}



          <label className="flex gap-3">
            <input
            type="checkbox"
            checked={form.pets}
            onChange={(e)=>setForm({
              ...form,
              pets:e.target.checked
            })}
            />

            Haustiere

          </label>



          <label className="flex gap-3">
            <input
            type="checkbox"
            checked={form.smoker}
            onChange={(e)=>setForm({
              ...form,
              smoker:e.target.checked
            })}
            />

            Raucher

          </label>


          <button
          onClick={save}
          className="w-full rounded-xl bg-teal-600 py-3 text-white font-semibold"
          >
            Profil speichern
          </button>


        </div>


      </div>

    </main>

  );

}