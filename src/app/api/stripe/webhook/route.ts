﻿import { NextResponse } from "next/server";

import Stripe from "stripe";

import { createAdminClient } from "@/lib/supabase/admin";


const stripe =
  new Stripe(
    process.env.STRIPE_SECRET_KEY!
  );



export async function POST(
  request:Request
){


  const body =
    await request.text();


  const signature =
    request.headers.get(
      "stripe-signature"
    );


  if(!signature){

    return NextResponse.json(
      {
        error:"Missing signature"
      },
      {
        status:400
      }
    );

  }



  let event:Stripe.Event;



  try{


    event =
      stripe.webhooks.constructEvent(

        body,

        signature,

        process.env.STRIPE_WEBHOOK_SECRET!

      );


  }
  catch(error){

    console.error(
      "STRIPE SIGNATURE ERROR",
      error
    );


    return NextResponse.json(
      {
        error:"invalid signature"
      },
      {
        status:400
      }
    );

  }




  console.log(
    "STRIPE EVENT:",
    event.type
  );



  const supabase =
    createAdminClient();





  if(
    event.type === "checkout.session.completed"
  ){


    const session =
      event.data.object as Stripe.Checkout.Session;



    console.log(
      "SESSION METADATA:",
      session.metadata
    );



    const userId =
      session.metadata?.user_id;



    if(!userId){

      console.error(
        "KEINE USER ID IN METADATA"
      );

      return NextResponse.json({
        received:true
      });

    }



    const stripeSubscription =
      await stripe.subscriptions.retrieve(
        session.subscription as string
      );




    const { error } =
    await supabase
    .from("subscriptions")
    .insert({

      user_id:userId,

      plan:"premium",

      price:4900,

      active:true,


      stripe_customer_id:
        session.customer as string,


      stripe_subscription_id:
        stripeSubscription.id,


      subscription_status:
        stripeSubscription.status,


      current_period_end:
        new Date(
          stripeSubscription.items.data[0].current_period_end * 1000
        ).toISOString(),


      cancel_at_period_end:
        stripeSubscription.cancel_at_period_end


    });



    if(error){

      console.error(
        "SUPABASE INSERT ERROR",
        error
      );

    }
    else{

      console.log(
        "PREMIUM GESPEICHERT"
      );

    }



  }




  return NextResponse.json({

    received:true

  });


}


