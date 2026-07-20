import { createAdminClient } from "@/lib/supabase/admin";


export async function updateApplicationNote(
  id:string,
  notes:string
){

  const supabase = createAdminClient();


  const { data, error } = await supabase
    .from("applications")
    .update({
      notes
    })
    .eq("id", id)
    .select()
    .single();



  if(error){

    console.log(
      "UPDATE APPLICATION NOTE ERROR:",
      error
    );

    return null;

  }


  return data;

}


