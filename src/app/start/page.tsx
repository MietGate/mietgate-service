"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function StartPage() {

  const router = useRouter();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");


  async function register(){

    setLoading(true);
    setError("");

    const supabase = createClient();


    const { error } = await supabase.auth.signUp({

      email,
      password,

      options:{
        data:{
          full_name:name
        }
      }

    });


    if(error){

      setError(error.message);
      setLoading(false);
      return;

    }


    router.push("/dashboard");

  }



  return (

    <main className="mx-auto max-w-md px-6 py-20">

      <h1 className="text-4xl font-bold text-slate-900">
        Erstelle dein MietGate Profil
      </h1>

      <p className="mt-4 text-slate-600">
        Einmal registrieren und MietGate übernimmt deine Mietbewerbungen.
      </p>


      <div className="mt-8 space-y-4">

        <input
          className="w-full rounded-xl border p-4"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="w-full rounded-xl border p-4"
          placeholder="E-Mail"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="w-full rounded-xl border p-4"
          placeholder="Passwort"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={register}
          disabled={loading}
          className="w-full rounded-xl bg-teal-500 py-3 font-semibold text-white"
        >
          {loading ? "Wird erstellt..." : "MietGate starten"}
        </button>


        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

      </div>

    </main>

  );

}

