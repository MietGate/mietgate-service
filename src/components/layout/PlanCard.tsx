﻿"use client";

import { useEffect, useState } from "react";

import { getCurrentPlan } from "@/services/plans/current-plan";
import { PLAN_LIMITS } from "@/services/plans/plans";


type Plan = "basic" | "premium" | null;


export default function PlanCard(){


  const [plan,setPlan] =
    useState<Plan>(null);


  useEffect(()=>{


    async function load(){

      const current =
        await getCurrentPlan();


      setPlan(current);

    }


    load();


  },[]);




  if(!plan){


    return (

      <div
        className="
        rounded-2xl
        bg-slate-50
        border
        border-slate-200
        p-4
        "
      >

        <p className="text-sm font-semibold text-slate-800">

          Kein aktives Abo

        </p>


        <p className="mt-1 text-xs text-slate-600">

          Wähle deinen MietGate Tarif aus, um Bewerbungen starten zu lassen.

        </p>


      </div>

    );


  }




  const data =
    PLAN_LIMITS[plan];




  return (

    <div
      className="
      rounded-2xl
      bg-teal-50
      p-4
      "
    >

      <p className="text-sm font-semibold text-teal-800">

        {data.name}

      </p>


      <p className="mt-1 text-xs text-teal-700">

        {data.viewingGuarantee} garantierte Besichtigungen inklusive.

      </p>


    </div>

  );


}

