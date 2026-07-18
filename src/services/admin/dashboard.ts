import { createAdminClient } from "@/lib/supabase/admin";


export async function getAdminStats() {

  const supabase = createAdminClient();



  const { count: customers } =
    await supabase
      .from("profiles")
      .select("*", {
        count: "exact",
        head: true
      })
      .neq(
        "role",
        "admin"
      );





  const { count: applications } =
    await supabase
      .from("applications")
      .select("*", {
        count:"exact",
        head:true
      });





  const { count: viewings } =
    await supabase
      .from("viewings")
      .select("*", {
        count:"exact",
        head:true
      });







  /*
    Bewerbungs Pipeline
  */

  const { data: applicationStatuses } =
    await supabase
      .from("applications")
      .select("status");



  const pipeline = {

    Vorbereitung:0,

    Beworben:0,

    "Antwort erhalten":0,

    Besichtigung:0,

    Zusage:0,

    Absage:0

  };



  applicationStatuses?.forEach(
    (item:any)=>{

      if(
        item.status in pipeline
      ){

        pipeline[
          item.status as keyof typeof pipeline
        ]++;

      }

    }
  );







  /*
    geplante Besichtigungen
  */


  const { data: pendingViewings } =
    await supabase
      .from("viewings")
      .select(`
        id,
        application_id,
        title,
        address,
        city,
        viewing_date,
        viewing_time,
        status,
        user_id
      `)
      .eq(
        "status",
        "geplant"
      )
      .order(
        "viewing_date",
        {
          ascending:true
        }
      )
      .limit(5);







  /*
    abgesagte Besichtigungen
  */

  const { data: declinedViewings } =
    await supabase
      .from("viewings")
      .select(`
        id,
        application_id,
        title,
        address,
        city,
        viewing_date,
        viewing_time,
        status,
        user_id
      `)
      .eq(
        "status",
        "abgesagt"
      )
      .order(
        "created_at",
        {
          ascending:false
        }
      )
      .limit(10);







  /*
    letzte Besichtigungen
  */


  const { data: latestViewings } =
    await supabase
      .from("viewings")
      .select(`
        id,
        title,
        city,
        status,
        user_id,
        viewing_date,
        viewing_time
      `)
      .order(
        "created_at",
        {
          ascending:false
        }
      )
      .limit(5);







  const userIds = [

    ...(pendingViewings || []),

    ...(declinedViewings || []),

    ...(latestViewings || [])

  ]
  .map(
    item =>
      item.user_id
  )
  .filter(Boolean);







  const { data: customersData } =
    userIds.length > 0

    ?

    await supabase
      .from("profiles")
      .select(`
        id,
        full_name,
        email,
        phone
      `)
      .in(
        "id",
        userIds
      )

    :

    {
      data:[]
    };







  function attachCustomer(
    items:any[] | null
  ){

    return (

      items?.map(
        item=>({

          ...item,

          customer:

            customersData?.find(
              customer =>
                customer.id === item.user_id
            )
            ||
            null

        })
      )

      ||

      []

    );

  }








  return {


    customers:
      customers || 0,


    applications:
      applications || 0,


    viewings:
      viewings || 0,



    pipeline,



    alerts:
      declinedViewings?.length || 0,



    pendingViewings:
      attachCustomer(
        pendingViewings
      ),



    declinedViewings:
      attachCustomer(
        declinedViewings
      ),



    latestViewings:
      attachCustomer(
        latestViewings
      )


  };

}