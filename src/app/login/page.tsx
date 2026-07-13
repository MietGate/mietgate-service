"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function LoginPage(){

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");



  async function login(){

    setLoading(true);
    setError("");

    const supabase = createClient();



    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({

      email,
      password

    });



    if(error){

      setError(error.message);
      setLoading(false);
      return;

    }



    const user = data.user;


    if(!user){

      setError("Login fehlgeschlagen");
      setLoading(false);
      return;

    }



    const {
      data:profile
    } = await supabase
      .from("profiles")
      .select("role")
      .eq("id",user.id)
      .single();



    if(profile?.role === "admin"){

      router.push("/admin/dashboard");

    }else{

      router.push("/dashboard");

    }



  }



  return (

    <main className="mx-auto max-w-md px-6 py-20">


      <h1 className="text-4xl font-bold">
        MietGate Login
      </h1>


      <p className="mt-4 text-slate-600">
        Verwalte deine Mietbewerbungen.
      </p>



      <div className="mt-8 space-y-4">


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
          onClick={login}
          disabled={loading}
          className="w-full rounded-xl bg-teal-600 py-3 text-white font-semibold"
        >

          {loading
            ? "Anmeldung..."
            : "Einloggen"
          }

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