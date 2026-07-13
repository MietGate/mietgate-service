import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";


export async function PATCH(request: Request) {


  try {


    const body = await request.json();


    const {
      viewingId,
      status
    } = body;



    if (!viewingId || !status) {

      return NextResponse.json(
        {
          error: "Fehlende Daten"
        },
        {
          status:400
        }
      );

    }




    if (
      status !== "accepted" &&
      status !== "declined"
    ) {

      return NextResponse.json(
        {
          error:"Ungültiger Status"
        },
        {
          status:400
        }
      );

    }




    const supabase = await createClient();



    const {
      data:{
        user
      }
    } = await supabase.auth.getUser();




    if(!user){

      return NextResponse.json(
        {
          error:"Nicht eingeloggt"
        },
        {
          status:401
        }
      );

    }





    const { data, error } = await supabase
      .from("viewings")
      .update({
        status
      })
      .eq("id", viewingId)
      .eq("user_id", user.id)
      .select()
      .single();





    if(error){

      console.error(
        "VIEWING UPDATE ERROR:",
        error
      );


      return NextResponse.json(
        {
          error:error.message
        },
        {
          status:500
        }
      );

    }





    return NextResponse.json({

      success:true,

      viewing:data

    });



  } catch(error){


    console.error(error);


    return NextResponse.json(
      {
        error:"Server Fehler"
      },
      {
        status:500
      }
    );


  }


}