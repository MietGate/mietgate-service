"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Menu,
  X,
  LayoutDashboard,
  CalendarDays,
  User,
  Search,
  FileText,
  ClipboardList,
  Settings,
} from "lucide-react";



const navigation = [

  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Kalender",
    href: "/kalender",
    icon: CalendarDays,
  },

  {
    name: "Bewerbungen",
    href: "/bewerbungen",
    icon: ClipboardList,
  },

  {
    name: "Dokumente",
    href: "/dokumente",
    icon: FileText,
  },

  {
    name: "Mein Profil",
    href: "/profil",
    icon: User,
  },

  {
    name: "Suchprofil",
    href: "/suchprofil",
    icon: Search,
  },

  {
    name: "Einstellungen",
    href: "/einstellungen",
    icon: Settings,
  },

];



export default function MobileMenu(){


  const [open,setOpen] = useState(false);



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
            h-full
            w-72
            bg-white
            p-6
            shadow-xl
            "

          >



            <div className="flex items-center justify-between">


              <h2 className="text-xl font-bold">

                Miet
                <span className="text-teal-600">
                  Gate
                </span>

              </h2>



              <button

                onClick={()=>setOpen(false)}

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


                    <span>
                      {item.name}
                    </span>


                  </Link>


                );


              })}


            </nav>



          </aside>



        </div>


      )}



    </>

  );


}


