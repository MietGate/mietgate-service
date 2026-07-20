import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

import {
  resend
} from "@/lib/email/resend";



export async function POST(req:Request){


  const body =
    await req.json();


  const supabase =
    createAdminClient();




  const {
    data,
    error
  }
  =
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




  const {
    data:user
  }
  =
  await supabase
    .from("profiles")
    .select(
      "full_name,email"
    )
    .eq(
      "id",
      body.user_id
    )
    .single();





  if(
    user?.email &&
    resend
  ){


    await resend.emails.send({

      from:
        "MietGate <noreply@service.mietgate.de>",


      to:
        user.email,


      subject:
        "Deine MietGate Besichtigung wurde geplant",


      html:

`
<h1>Besichtigung geplant</h1>

<p>
Hallo ${user.full_name || "MietGate Nutzer"},
</p>

<p>
Deine Besichtigung wurde erfolgreich geplant.
</p>

<p>
<strong>${body.address}</strong>
</p>

<p>
Datum: ${body.viewing_date}
</p>

<p>
Uhrzeit: ${body.viewing_time}
</p>

<p>
Dein MietGate Team
</p>
`

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
    data:viewing,
    error:viewingError
  }
  =
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





  if(viewingError){


    return NextResponse.json(
      {
        success:false,
        error:viewingError.message
      },
      {
        status:500
      }
    );

  }






  if(
    body.status === "abgelehnt" &&
    viewing.application_id
  ){


    const {
      data:application
    }
    =
    await supabase
      .from("applications")
      .select(
        "status,user_id"
      )
      .eq(
        "id",
        viewing.application_id
      )
      .single();





    await supabase
      .from("applications")
      .update({

        status:
          "Absage"

      })
      .eq(
        "id",
        viewing.application_id
      );






    await supabase
      .from("application_history")
      .insert({

        application_id:
          viewing.application_id,

        old_status:
          application?.status || null,

        new_status:
          "Absage"

      });






    if(application){


      await supabase
        .from("notifications")
        .insert({

          user_id:
            application.user_id,

          title:
            "Besichtigung abgesagt",

          message:
            "Ein Kunde hat eine Besichtigung abgesagt."

        });



      if(resend){


        await resend.emails.send({

          from:
            "MietGate <noreply@service.mietgate.de>",


          to:
            "admin@mietgate.de",


          subject:
            "Besichtigung wurde abgesagt",


          html:

`
<h1>Besichtigung abgesagt</h1>

<p>
Ein Kunde hat eine Besichtigung abgesagt.
</p>

<p>
Application ID:
${viewing.application_id}
</p>

`

        });


      }



    }



  }





  return NextResponse.json({

    success:true,

    data:viewing

  });



}



