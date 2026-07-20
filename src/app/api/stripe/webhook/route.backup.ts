﻿import { NextResponse } from "next/server";

import Stripe from "stripe";

import { createAdminClient } from "@/lib/supabase/admin";

import {
  resend
} from "@/lib/email/resend";

import {
  premiumActivatedEmail
} from "@/lib/email/templates";


const stripe =
  new Stripe(
    process.env.STRIPE_SECRET_KEY!
  );



export async function POST(
  request: Request
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
        error:"Keine Signatur"
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
      "WEBHOOK SIGNATURE ERROR",
      error
    );


    return NextResponse.json(
      {
        error:"Webhook Fehler"
      },
      {
        status:400
      }
    );

  }





  const supabase =
    createAdminClient();






  if(
    event.type === "checkout.session.completed"
  ){


    const session =
      event.data.object as Stripe.Checkout.Session;



    const userId =
      session.metadata?.user_id;



    if(
      userId &&
      session.subscription
    ){


      const subscription =
        await stripe.subscriptions.retrieve(
          session.subscription as string
        ) as Stripe.Subscription;




      const { error } =
      await supabase
      .from("subscriptions")
      .upsert(

        {

          user_id:userId,

          plan:"premium",

          price:4900,

          active:true,


          stripe_customer_id:
            session.customer as string,


          stripe_subscription_id:
            subscription.id,


          subscription_status:
            subscription.status,


          current_period_end:
            new Date(
              subscription.items.data[0].current_period_end * 1000
            ).toISOString(),


          cancel_at_period_end:
            subscription.cancel_at_period_end

        },


        {
          onConflict:
            "stripe_subscription_id"
        }


      );



      if(error){

        console.error(
          "SUPABASE SUBSCRIPTION ERROR",
          error
        );

      }




      const email =
        session.customer_details?.email;



      if(email){


        const mail =
          premiumActivatedEmail(
            "MietGate Kunde"
          );


        await resend!.emails.send({

          from:
            "MietGate <noreply@service.mietgate.de>",


          to:
            email,


          subject:
            mail.subject,


          html:
            mail.html

        });


      }



    }


  }





  if(
    event.type === "customer.subscription.updated"
  ){


    const subscription =
      event.data.object as Stripe.Subscription;



    await supabase
    .from("subscriptions")
    .update({

      active:
        subscription.status === "active",

      subscription_status:
        subscription.status,


      current_period_end:
        new Date(
          subscription.items.data[0].current_period_end * 1000
        ).toISOString(),


      cancel_at_period_end:
        subscription.cancel_at_period_end


    })
    .eq(

      "stripe_subscription_id",

      subscription.id

    );


  }







  if(
    event.type === "customer.subscription.deleted"
  ){


    const subscription =
      event.data.object as Stripe.Subscription;



    await supabase
    .from("subscriptions")
    .update({

      active:false,

      subscription_status:"canceled"

    })
    .eq(

      "stripe_subscription_id",

      subscription.id

    );


  }







  return NextResponse.json({

    received:true

  });


}
