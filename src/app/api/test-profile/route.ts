import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";


export async function GET(){

  const supabase = createAdminClient();


  const {data,error}=await supabase
    .from("profiles")
    .select("*")
    .eq(
      "id",
      "4eb02030-6056-4e11-a192-709ca0561113"
    )
    .single();



  return NextResponse.json({
    data,
    error
  });

}