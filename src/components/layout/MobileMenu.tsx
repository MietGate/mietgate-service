"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  LayoutDashboard,
  User,
  FileText,
  ClipboardList,
  Settings,
} from "lucide-react";

import LogoutButton from "@/components/auth/LogoutButton";
import Logo from "@/components/brand/Logo";


const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Profil",
    href: "/profil",
    icon: User,
  },
  {
    name: "Dokumente",
    href: "/dokumente",
    icon: FileText,
  },
  {
    name: "Bewerbungen",
    href: "/bewerbungen",
    icon: ClipboardList,
  },
  {
    name: "Einstellungen",
    href: "/einstellungen",
    icon: Settings,
  },
];


export default function MobileMenu() {


  const [open,setOpen] = useState(false);



  useEffect(()=>{

    if(open){

      document.body.style.overflow="hidden";

    }else{

      document.body.style.overflow="auto";

    }


    return ()=>{

      document.body.style.overflow="auto";

    };


  },[open]);




  return (

    <>


      <button
        onClick={()=>setOpen(true)}
        className="
        rounded-xl
        p-2
        text-slate-600
        hover:bg-slate-100
        "
      >

        <Menu size={24}/>

      </button>




      {open && (

        <div className="fixed inset-0 z-50">


          <div
            onClick={()=>setOpen(false)}
            className="
            absolute
            inset-0
            bg-black/30
            "
          />




          <aside
            className="
            relative
            flex
            h-full
            w-[280px]
            flex-col
            bg-white
            p-6
            shadow-xl
            "
          >



            <div className="flex items-center justify-between">


              <Logo width={140}/>



              <button
                onClick={()=>setOpen(false)}
                className="rounded-lg p-2 hover:bg-slate-100"
              >

                <X size={24}/>

              </button>


            </div>





            <nav className="mt-8 flex flex-col gap-2">


              {navigation.map((item)=>{


                const Icon=item.icon;


                return (

                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={()=>setOpen(false)}
                    className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-slate-700
                    hover:bg-slate-100
                    "
                  >

                    <Icon size={20}/>

                    <span className="font-medium">
                      {item.name}
                    </span>


                  </Link>

                );


              })}


            </nav>





            <div className="mt-auto">


              <LogoutButton/>


            </div>




          </aside>



        </div>

      )}



    </>

  );

}