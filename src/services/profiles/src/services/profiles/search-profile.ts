import { createClient } from "@/lib/supabase/server";

export async function getSearchProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("search_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function saveSearchProfile(values: any) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Nicht angemeldet.");
  }

  const payload = {
    ...values,
    user_id: user.id,
  };

  const { data, error } = await supabase
    .from("search_profiles")
    .upsert(payload, {
      onConflict: "user_id",
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}


