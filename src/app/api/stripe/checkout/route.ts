﻿import { NextResponse } from "next/server";

import Stripe from "stripe";

import { createClient } from "@/lib/supabase/server";


const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);



export async function POST(){


  const supabase =
    await createClient();



  const {
    data:{
      user
    }
  } =
  await supabase.auth.getUser();



  if(!user){


    return NextResponse.json(
      {
        error:"Nicht eingeloggt"
      },
      {
        status:401
      }
    );

  }



  const {
    data:existingSubscription
  } =
  await supabase

  .from("subscriptions")

  .select(
    "stripe_customer_id"
  )

  .eq(
    "user_id",
    user.id
  )

  .maybeSingle();





  const session =
    await stripe.checkout.sessions.create({


      mode:"subscription",



      customer:
        existingSubscription?.stripe_customer_id || undefined,



      customer_email:
        existingSubscription?.stripe_customer_id
        ?
        undefined
        :
        user.email!,



      subscription_data:{

        metadata:{

          user_id:user.id

        }

      },



      metadata:{

        user_id:user.id

      },



      line_items:[

        {

          price:
            process.env.STRIPE_PREMIUM_PRICE_ID!,


          quantity:1

        }

      ],



      success_url:
        `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,



      cancel_url:
        `${process.env.NEXT_PUBLIC_SITE_URL}/upgrade?cancel=true`


    });





  return NextResponse.json({

    url:session.url

  });


}

