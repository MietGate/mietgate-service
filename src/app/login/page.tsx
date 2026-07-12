"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function LoginPage() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");



  async function login(){

    setLoading(true);
    setError("");

    const supabase = createClient();


 const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

console.log("LOGIN:", data);
console.log("ERROR:", error);

const session = await supabase.auth.getSession();
console.log("SESSION:", session);

console.log("LOGIN DATA:", data);
console.log("LOGIN ERROR:", error);

if (error) {
  setError(error.message);
  setLoading(false);
  return;
}

const sessionResult = await supabase.auth.getSession();
console.log("SESSION AFTER LOGIN:", sessionResult);

router.push("/dashboard");


    router.push("/dashboard");


  }



  return (

    <main className="mx-auto max-w-md px-6 py-20">


      <h1 className="text-4xl font-bold text-slate-900">
        MietGate Login
      </h1>


      <p className="mt-4 text-slate-600">
        Melde dich an und verwalte deine Wohnungssuche.
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
          className="w-full rounded-xl bg-teal-500 py-3 font-semibold text-white"
        >

          {loading ? "Anmeldung..." : "Einloggen"}

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

