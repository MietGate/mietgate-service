﻿"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import LogoutButton from "@/components/auth/LogoutButton";
import Logo from "@/components/brand/Logo";

import {
  LayoutDashboard,
  CalendarDays,
  User,
  Search,
  FileText,
  ClipboardList,
  Settings,
} from "lucide-react";

import { getCurrentPlan } from "@/services/plans/current-plan";


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


export default function Sidebar() {


  const [plan, setPlan] = useState<"basic" | "premium">("basic");


  useEffect(() => {

    async function loadPlan(){

      const current = await getCurrentPlan();

      setPlan(current);

    }


    loadPlan();


  }, []);



  return (

    <aside
      className="
      hidden
      min-h-screen
      w-72
      flex-col
      border-r
      border-slate-200
      bg-white
      px-6
      py-8
      md:flex
      "
    >


      <div>

        <Logo width={150}/>

        <p className="mt-2 text-sm text-slate-500">
          Bewerberservice
        </p>

      </div>


      <nav className="mt-10 flex flex-col gap-2">

        {navigation.map((item)=>{

          const Icon = item.icon;


          return (

            <Link
              key={item.name}
              href={item.href}
              className="
              flex
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-slate-600
              transition
              hover:bg-slate-100
              hover:text-slate-900
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


      <div className="mt-auto space-y-4">


        <div
          className="
          rounded-2xl
          bg-teal-50
          p-4
          "
        >

          <p className="text-sm font-semibold text-teal-800">
            MietGate {plan === "premium" ? "Premium" : "Basic"}
          </p>


          <p className="mt-1 text-xs text-teal-700">
            {plan === "premium"
              ? "Dein Premium Zugang ist aktiv."
              : "Upgrade jederzeit über deine Tarifverwaltung möglich."
            }
          </p>


        </div>


        <LogoutButton />


      </div>


    </aside>

  );

}

