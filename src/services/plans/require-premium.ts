﻿import { createClient } from "@/lib/supabase/server";


export async function requirePremium(){

  const supabase = await createClient();


  const {
    data:{
      user
    }
  } = await supabase.auth.getUser();



  if(!user){

    throw new Error(
      "Nicht angemeldet"
    );

  }



  const {
    data:subscription,
    error
  } = await supabase

    .from("subscriptions")

    .select(
      "plan,active"
    )

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



  if(error){

    console.error(
      "PREMIUM CHECK ERROR",
      error
    );

    throw error;

  }



  if(
    subscription?.plan !== "premium"
  ){

    throw new Error(
      "Premium erforderlich"
    );

  }



  return true;

}

