"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function LogoutButton(){

  const router = useRouter();


  async function logout(){

    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/");

  }


  return (

    <button
      onClick={logout}
      className="
        w-full
        rounded-xl
        bg-slate-900
        px-4
        py-3
        text-white
        hover:bg-slate-800
      "
    >
      Abmelden
    </button>

  );

}