import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";



export async function GET(){


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
        subscription:null
      },

      {
        status:401
      }

    );


  }





  const {
    data:subscription
  } =
  await supabase
    .from("subscriptions")
    .select(`
      plan,
      active,
      subscription_status,
      current_period_end,
      cancel_at_period_end
    `)
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






  return NextResponse.json({

    subscription

  });



}




