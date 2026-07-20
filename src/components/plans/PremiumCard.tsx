"use client";

import { useEffect, useState } from "react";

import { Crown } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import ManageSubscriptionButton from "@/components/plans/ManageSubscriptionButton";



export default function PremiumCard(){


  const [subscription,setSubscription] =
    useState<any>(null);



  useEffect(()=>{


    async function load(){


      const supabase =
        createClient();



      const {
        data:{
          user
        }
      } =
      await supabase.auth.getUser();



      if(!user){

        return;

      }



      const {
        data
      } =
      await supabase
        .from("subscriptions")
        .select("*")
        .eq(
          "user_id",
          user.id
        )
        .eq(
          "active",
          true
        )
        .order(
          "created_at",
          {
            ascending:false
          }
        )
        .limit(1)
        .maybeSingle();



      setSubscription(data);


    }


    load();


  },[]);





  if(!subscription){

    return null;

  }




  return (

    <div
      className="
      rounded-2xl
      bg-teal-50
      p-6
      border
      border-teal-100
      "
    >


      <div className="flex items-center gap-3">


        <Crown
          size={28}
          className="text-teal-600"
        />


        <div>

          <h2 className="font-bold text-lg text-slate-900">

            MietGate Premium

          </h2>


          <p className="text-sm text-teal-700">

            Premium Paket ist aktiv

          </p>


        </div>


      </div>





      <div className="mt-5 space-y-2 text-sm text-slate-700">


        <p>

          Status:
          {" "}
          <span className="font-semibold">

            {subscription.subscription_status}

          </span>

        </p>



        <p>

          Verlängerung:
          {" "}

          <span className="font-semibold">

            {
              subscription.current_period_end
              ?
              new Date(
                subscription.current_period_end
              ).toLocaleDateString("de-DE")
              :
              "-"
            }

          </span>

        </p>


      </div>





      <ManageSubscriptionButton />


    </div>

  );


}



