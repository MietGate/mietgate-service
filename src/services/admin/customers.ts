import { createAdminClient } from "@/lib/supabase/admin";


export async function getAdminCustomers() {

  const supabase = createAdminClient();


  const { data, error } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      city,
      budget,
      profile_completed,
      role
    `)
    .neq("role", "admin")
    .order("created_at", {
      ascending:false
    });


  if(error){
    console.error("ADMIN CUSTOMERS ERROR:", error);
    return [];
  }


  return data || [];

}