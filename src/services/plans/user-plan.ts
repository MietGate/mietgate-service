import { createClient } from "@/lib/supabase/client";

import {
  PlanType,
  PLAN_LIMITS
} from "@/services/plans/plans";


export type UserPlan = PlanType | null;



export async function getUserPlan(): Promise<UserPlan>{


  const supabase =
    createClient();



  const {
    data:{
      user
    }
  } =
  await supabase.auth.getUser();



  if(!user){

    return null;

  }



  const {
    data,
    error
  } =
  await supabase
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
    .limit(1)
    .maybeSingle();



  if(error){

    console.log(
      "USER PLAN ERROR",
      error
    );

    return null;

  }



  if(
    data?.plan === "basic" ||
    data?.plan === "premium"
  ){

    return data.plan;

  }



  return null;


}




export function hasPremium(
  plan:UserPlan
){

  return plan === "premium";

}




export function getPlanLimit(
  plan:PlanType
){

  return PLAN_LIMITS[plan];

}

