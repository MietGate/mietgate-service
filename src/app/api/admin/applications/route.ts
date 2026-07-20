import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";


export async function PATCH(req:Request){


  const body = await req.json();



  const supabase =
    createAdminClient();



  const applicationId =
    body.applicationId;



  const newStatus =
    body.status;




  if(!applicationId || !newStatus){


    return NextResponse.json(
      {
        success:false,
        error:"Missing data"
      },
      {
        status:400
      }
    );

  }




  // aktuellen Status holen

  const {
    data: application,
    error: fetchError
  } =
    await supabase
      .from("applications")
      .select(`
        id,
        status
      `)
      .eq(
        "id",
        applicationId
      )
      .single();





  if(fetchError || !application){


    return NextResponse.json(
      {
        success:false,
        error:"Application not found"
      },
      {
        status:404
      }
    );

  }





  const oldStatus =
    application.status;



  // gleicher Status = nichts machen

  if(oldStatus === newStatus){


    return NextResponse.json({

      success:true,

      message:"No change"

    });


  }





  // Status aktualisieren

  const {
    data:updated,
    error:updateError
  } =
    await supabase
      .from("applications")
      .update({

        status:newStatus

      })
      .eq(
        "id",
        applicationId
      )
      .select()
      .single();







  if(updateError){


    console.error(
      "APPLICATION UPDATE ERROR",
      updateError
    );


    return NextResponse.json(
      {
        success:false,
        error:updateError.message
      },
      {
        status:500
      }
    );

  }





  // Status Historie speichern

  const {
    error:historyError
  } =
    await supabase
      .from("application_history")
      .insert({

        application_id:
          applicationId,

        old_status:
          oldStatus,

        new_status:
          newStatus

      });





  if(historyError){


    console.error(
      "APPLICATION HISTORY ERROR",
      historyError
    );


  }





  return NextResponse.json({

    success:true,

    data:updated

  });


}



