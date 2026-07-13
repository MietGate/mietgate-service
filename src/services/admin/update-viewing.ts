import { createAdminClient } from "@/lib/supabase/admin";


export async function updateViewingStatus(
  id: string,
  status: string
){

  const supabase = createAdminClient();


  const { error } = await supabase
    .from("viewings")
    .update({
      status
    })
    .eq("id", id);


  if(error){

    console.error(
      "UPDATE VIEWING ERROR:",
      error
    );

    return false;

  }


  return true;

}