import { createAdminClient } from "@/lib/supabase/admin";


export async function updateViewingStatus(
  id:string,
  status:string
){

  const supabase = createAdminClient();



  /*
    aktuelle Besichtigung holen
  */

  const {
    data:viewing,
    error:viewingError
  } =
    await supabase
      .from("viewings")
      .select(`
        id,
        application_id,
        status
      `)
      .eq(
        "id",
        id
      )
      .single();



  if(viewingError || !viewing){

    console.error(
      "VIEWING NOT FOUND",
      viewingError
    );

    return false;

  }





  /*
    Besichtigung aktualisieren
  */


  const {
    error:updateError
  } =
    await supabase
      .from("viewings")
      .update({

        status

      })
      .eq(
        "id",
        id
      );




  if(updateError){

    console.error(
      "UPDATE VIEWING ERROR",
      updateError
    );

    return false;

  }





  /*
    Bewerbung synchronisieren
  */


  if(
    viewing.application_id
  ){


    let applicationStatus =
      null;



    if(
      status === "abgesagt"
    ){

      applicationStatus =
        "Antwort erhalten";

    }




    if(
      status === "erledigt"
    ){

      applicationStatus =
        "Zusage";

    }





    if(applicationStatus){


      const {
        data:application
      } =
        await supabase
          .from("applications")
          .select("status")
          .eq(
            "id",
            viewing.application_id
          )
          .single();





      await supabase
        .from("applications")
        .update({

          status:
            applicationStatus

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
            applicationStatus

        });


    }


  }




  return true;

}


