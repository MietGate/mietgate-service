"use client";

import { Bell, UserCircle, LogOut } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function Topbar() {


  const router = useRouter();


  async function logout(){

    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");

    router.refresh();

  }



  return (

    <header
      className="
      flex
      h-20
      w-full
      items-center
      justify-between
      border-b
      border-slate-200
      bg-white
      px-4
      sm:px-6
      md:px-8
      "
    >



      <div className="flex min-w-0 items-center gap-3">


        <div className="md:hidden shrink-0">

          <MobileMenu />

        </div>




        <div className="min-w-0">


          <h2
            className="
            truncate
            text-base
            font-semibold
            text-slate-900
            sm:text-lg
            md:text-xl
            "
          >
            Willkommen bei MietGate
          </h2>



          <p className="hidden text-sm text-slate-500 sm:block">
            Dein Mietbewerbungsservice
          </p>


        </div>


      </div>






      <div className="flex shrink-0 items-center gap-2">



        <button
          className="
          rounded-xl
          p-2
          text-slate-500
          hover:bg-slate-100
          "
        >

          <Bell size={20}/>

        </button>






        <div
          className="
          hidden
          items-center
          gap-3
          rounded-xl
          bg-slate-50
          px-3
          py-2
          sm:flex
          "
        >

          <UserCircle
            size={26}
            className="text-teal-600"
          />


          <div>


            <p className="text-sm font-medium text-slate-900">
              Kunde
            </p>


            <p className="text-xs text-slate-500">
              MietGate Nutzer
            </p>


          </div>


        </div>







        <button
          onClick={logout}
          className="
          rounded-xl
          p-2
          text-red-600
          hover:bg-red-50
          sm:bg-red-50
          sm:px-4
          sm:py-2
          "
        >

          <LogOut size={18}/>


          <span className="hidden sm:inline">
            Logout
          </span>


        </button>



      </div>



    </header>

  );

}