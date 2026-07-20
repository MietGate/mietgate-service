﻿"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Crown, CheckCircle2 } from "lucide-react";

import Card from "@/components/ui/Card";
import ManageSubscriptionButton from "@/components/plans/ManageSubscriptionButton";

import { getCurrentPlan } from "@/services/plans/current-plan";
import { getSubscription } from "@/services/subscriptions/get-subscription";


export default function CurrentPlanCard(){


  const [plan,setPlan] = useState<"basic"|"premium">("basic");

  const [subscription,setSubscription] = useState<any>(null);

  const [loading,setLoading] = useState(true);



  useEffect(()=>{


    async function load(){


      const [current,sub] = await Promise.all([

        getCurrentPlan(),

        getSubscription()

      ]);


      setPlan(current);

      setSubscription(sub);

      setLoading(false);


    }


    load();


  },[]);




  if(loading){

    return <Card className="p-6">Lade Tarif...</Card>;

  }




  if(plan === "premium"){

    return (

      <Card className="border-emerald-200 bg-emerald-50 p-6">


        <div className="flex items-start justify-between gap-4">


          <div className="flex gap-4">


            <div className="rounded-2xl bg-emerald-100 p-3">

              <Crown className="text-emerald-700" size={28}/>

            </div>


            <div>


              <div className="flex items-center gap-2">

                <h2 className="text-xl font-bold text-slate-900">

                  MietGate Premium

                </h2>

                <CheckCircle2 className="text-emerald-600" size={20}/>

              </div>


              <p className="mt-1 text-slate-600">

                Dein Premium Zugang ist aktiv.

              </p>


              {subscription?.current_period_end && (

                <p className="mt-3 text-sm text-slate-500">

                  Nächste Verlängerung: {new Date(subscription.current_period_end).toLocaleDateString("de-DE")}

                </p>

              )}


            </div>


          </div>


          <ManageSubscriptionButton />


        </div>


      </Card>

    );

  }




  return (

    <Card className="p-6">


      <div className="flex items-start justify-between gap-4">


        <div>


          <h2 className="text-xl font-bold text-slate-900">

            MietGate Basic

          </h2>


          <p className="mt-2 text-slate-600">

            Aktiviere Premium für garantierte Besichtigungen und priorisierte Betreuung.

          </p>


          <ul className="mt-4 space-y-2 text-sm text-slate-600">

            <li>• Mindestens 5 garantierte Besichtigungen</li>

            <li>• Priorisierte Bearbeitung</li>

            <li>• Persönliche Unterstützung</li>

          </ul>


        </div>


        <div className="rounded-2xl bg-teal-50 px-4 py-3 text-center">

          <p className="text-sm text-teal-700">Premium</p>

          <p className="text-2xl font-bold text-slate-900">49 €</p>

          <p className="text-xs text-slate-500">pro Monat</p>

        </div>


      </div>


      <Link
        href="/upgrade"
        className="mt-6 block w-full rounded-xl bg-teal-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-teal-700"
      >

        Premium freischalten

      </Link>


    </Card>

  );


}


