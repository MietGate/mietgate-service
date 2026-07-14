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
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white
        px-6
        md:px-8
      "
    >


      <div className="flex items-center gap-4">


        <div className="md:hidden">
          <MobileMenu />
        </div>



        <div>

          <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
            Willkommen bei MietGate
          </h2>


          <p className="hidden text-sm text-slate-500 sm:block">
            Dein Mietbewerbungsservice
          </p>

        </div>


      </div>





      <div className="flex items-center gap-3">



        <button
          className="
            rounded-xl
            p-2
            text-slate-500
            transition
            hover:bg-slate-100
          "
        >

          <Bell size={22}/>

        </button>





        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            bg-slate-50
            px-3
            py-2
          "
        >


          <UserCircle
            size={26}
            className="text-teal-600"
          />



          <div className="hidden sm:block">


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
            flex
            items-center
            gap-2
            rounded-xl
            bg-red-50
            px-4
            py-2
            text-sm
            font-medium
            text-red-600
            hover:bg-red-100
          "

        >

          <LogOut size={18}/>

          Logout

        </button>



      </div>



    </header>

  );

}