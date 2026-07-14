"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {

  const router = useRouter();


  async function logout() {

    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");

    router.refresh();

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
        font-medium
        hover:bg-slate-700
        transition
      "
    >
      Abmelden
    </button>

  );

}