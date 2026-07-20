import { createAdminClient } from "@/lib/supabase/admin";


export async function updateApplicationStatus(
  id:string,
  status:string
){

  const supabase = createAdminClient();


  const { data, error } = await supabase
    .from("applications")
    .update({
      status
    })
    .eq("id", id)
    .select()
    .single();



  if(error){

    console.log(
      "UPDATE APPLICATION ERROR:",
      error
    );

    return null;

  }


  return data;

}


