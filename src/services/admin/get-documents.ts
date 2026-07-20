import { createAdminClient } from "@/lib/supabase/admin";

export async function getDocuments(userId: string) {

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false
    });

  if (error) {

    console.log(
      "GET DOCUMENTS ERROR:",
      error
    );

    return [];

  }

  return data;

}


