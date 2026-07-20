import { createClient } from "@/lib/supabase/client";


export async function getUserDashboardData() {

  const supabase = createClient();


  const {
    data:{
      user
    }
  } = await supabase.auth.getUser();


  if(!user){

    return null;

  }



  const [

    profileResult,

    searchProfileResult,

    documentsResult,

    appointmentsResult

  ] = await Promise.all([



    supabase
      .from("profiles")
      .select("*")
      .eq(
        "id",
        user.id
      )
      .single(),




    supabase
      .from("search_profiles")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .maybeSingle(),




    supabase
      .from("documents")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .order(
        "created_at",
        {
          ascending:false
        }
      ),





    supabase
      .from("appointments")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .order(
        "appointment_date",
        {
          ascending:true
        }
      )


  ]);





  return {


    user,


    profile:
      profileResult.data,



    searchProfile:
      searchProfileResult.data,



    documents:
      documentsResult.data || [],



    appointments:
      appointmentsResult.data || []

  };


}

