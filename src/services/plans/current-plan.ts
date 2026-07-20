import { createClient } from "@/lib/supabase/client";

import {
  PlanType
} from "@/services/plans/plans";


export async function getCurrentPlan(): Promise<PlanType> {

  const supabase = createClient();


  const {
    data:{
      user
    }
  } = await supabase.auth.getUser();



  if(!user){

    return "basic";

  }



  const {
    data,
    error
  } = await supabase
    .from("subscriptions")
    .select("plan")
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
    .limit(1);



  if(error){

    console.log(
      "PLAN ERROR:",
      error
    );

    return "basic";

  }



  const subscription =
    data?.[0];



  if(
    subscription?.plan === "premium"
  ){

    return "premium";

  }



  return "basic";

}

