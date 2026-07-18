import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";



export async function POST(req:Request){


  const body =
    await req.json();



  const supabase =
    createAdminClient();




  const {
    data,
    error
  } =
    await supabase
      .from("viewings")
      .insert({

        user_id:
          body.user_id,

        application_id:
          body.application_id || null,

        title:
          body.title,

        address:
          body.address,

        city:
          body.city,

        listing_url:
          body.listing_url || null,

        viewing_date:
          body.viewing_date,

        viewing_time:
          body.viewing_time,


        status:
          "geplant"

      })
      .select()
      .single();





  if(error){


    console.error(
      "VIEWING CREATE ERROR",
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







  if(body.application_id){



    const {
      data:application
    } =
      await supabase
        .from("applications")
        .select("status")
        .eq(
          "id",
          body.application_id
        )
        .single();






    await supabase
      .from("applications")
      .update({

        status:
          "Besichtigung"

      })
      .eq(
        "id",
        body.application_id
      );







    await supabase
      .from("application_history")
      .insert({

        application_id:
          body.application_id,


        old_status:
          application?.status || null,


        new_status:
          "Besichtigung"

      });



  }







  return NextResponse.json({

    success:true,

    data

  });


}









export async function PATCH(req:Request){


  const body =
    await req.json();



  const supabase =
    createAdminClient();




  const {
    data,
    error
  } =
    await supabase
      .from("viewings")
      .update({

        status:
          body.status

      })
      .eq(
        "id",
        body.id
      )
      .select()
      .single();







  if(error){


    console.error(
      "VIEWING UPDATE ERROR",
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