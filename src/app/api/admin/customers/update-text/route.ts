import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";


export async function PATCH(req:Request){


  const body = await req.json();


  const supabase = createAdminClient();



  const { data, error } = await supabase
    .from("profiles")
    .update({

      application_text:
        body.application_text,

      application_text_updated_at:
        new Date().toISOString()

    })
    .eq(
      "id",
      body.user_id
    )
    .select()
    .single();




  if(error){

    console.error(
      "UPDATE APPLICATION TEXT ERROR:",
      error
    );


    return NextResponse.json(
      {
        success:false,
        error:error.message
      },
      {
        status:500
      }
    );

  }



  return NextResponse.json({

    success:true,

    data

  });


}
