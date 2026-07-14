import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";



export async function POST(req: Request) {


  const body = await req.json();


  console.log(
    "NEUER TERMIN:",
    body
  );



  const supabase = createAdminClient();



  const { data, error } = await supabase
    .from("viewings")
    .insert({

      user_id: body.user_id,
      title: body.title,
      address: body.address,
      city: body.city,
      listing_url: body.listing_url || null,
      viewing_date: body.viewing_date,
      viewing_time: body.viewing_time,
      status: "pending"

    })
    .select()
    .single();





  if(error){


    console.error(
      "VIEWING INSERT ERROR:",
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






export async function PATCH(req:Request){


  const body = await req.json();



  console.log(
    "STATUS UPDATE:",
    body
  );



  const supabase = createAdminClient();



  const {data,error}=await supabase
    .from("viewings")
    .update({

      status:body.status

    })
    .eq(
      "id",
      body.viewingId
    )
    .select()
    .single();





  if(error){


    console.error(
      "VIEWING UPDATE ERROR:",
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