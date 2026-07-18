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
      income,
      pets,
      smoker,
      application_text,
      application_text_updated_at
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
