import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";


export async function POST(req:Request){


  const body = await req.json();


  const supabase = createAdminClient();



  const { error } =
    await supabase
      .from("profiles")
      .update({

        application_text:
          body.application_text

      })
      .eq(
        "id",
        body.user_id
      );




  if(error){


    console.error(
      "APPLICATION TEXT ERROR:",
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

    success:true

  });


}



