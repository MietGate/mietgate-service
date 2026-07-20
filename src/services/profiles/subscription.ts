import { createClient } from "@/lib/supabase/client";


export async function getUserSubscription(){


  const supabase = createClient();


  const {
    data:{
      user
    }
  } = await supabase.auth.getUser();



  if(!user){

    return null;

  }



  const {
    data
  } = await supabase
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
    .maybeSingle();



  return data || null;


}



