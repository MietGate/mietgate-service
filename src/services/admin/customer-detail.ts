import { createAdminClient } from "@/lib/supabase/admin";


export async function getCustomerDetail(id:string){


  const supabase = createAdminClient();



  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();



  if(profileError){

    console.log(
      "CUSTOMER PROFILE ERROR:",
      profileError
    );

    return null;

  }





  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", id)
    .order("created_at", {
      ascending:false
    });







  const { data: applications } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", id)
    .order("created_at", {
      ascending:false
    });







  const { data: viewings } = await supabase
    .from("viewings")
    .select("*")
    .eq("user_id", id)
    .order("created_at", {
      ascending:false
    });







  return {

    profile,

    documents: documents || [],

    applications: applications || [],

    viewings: viewings || []

  };


}
