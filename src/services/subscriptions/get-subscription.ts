import { createClient } from "@/lib/supabase/client";


export async function getSubscription(){


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
    data
  } =
  await supabase
    .from("subscriptions")
    .select(`
      id,
      plan,
      price,
      active,
      stripe_customer_id,
      stripe_subscription_id,
      created_at
    `)
    .eq(
      "user_id",
      user.id
    )
    .maybeSingle();




  return data || null;


}



