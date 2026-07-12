import { createAdminClient } from "@/lib/supabase/admin";


export async function getProfile(
  id:string
){

  const supabase = createAdminClient();


  const { data, error } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      email,
      city,
      budget,
      rooms,
      move_in_date,
      household,
      income
    `)
    .eq("id", id)
    .single();



  if(error){

    console.log(
      "GET PROFILE ERROR:",
      error
    );

    return null;

  }


  return data;

}