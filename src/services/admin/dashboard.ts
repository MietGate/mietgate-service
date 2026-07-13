import { createAdminClient } from "@/lib/supabase/admin";


export async function getAdminStats() {

  const supabase = createAdminClient();



  const { count: customers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .neq("role", "admin");




  const { count: applications } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true });




  const { count: viewings } = await supabase
    .from("viewings")
    .select("*", { count: "exact", head: true });





  /*
    Offene Besichtigungen
  */

  const { data: pendingViewings } = await supabase
    .from("viewings")
    .select(`
      id,
      title,
      address,
      city,
      viewing_date,
      viewing_time,
      status,
      user_id
    `)
    .eq("status", "pending")
    .order("viewing_date", {
      ascending: true
    })
    .limit(5);





  /*
    Abgesagte Besichtigungen
    Wichtig für Admin Benachrichtigungen
  */

  const { data: declinedViewings } = await supabase
    .from("viewings")
    .select(`
      id,
      title,
      address,
      city,
      viewing_date,
      viewing_time,
      status,
      user_id
    `)
    .eq("status", "declined")
    .order("created_at", {
      ascending: false
    })
    .limit(10);






  /*
    Letzte Besichtigungen
  */


  const { data: latestViewings } = await supabase
    .from("viewings")
    .select(`
      id,
      title,
      city,
      status,
      user_id
    `)
    .order("created_at", {
      ascending: false
    })
    .limit(5);






  /*
    Kundeninformationen laden
  */

  const userIds = [
    ...(pendingViewings || []),
    ...(declinedViewings || []),
    ...(latestViewings || [])
  ]
  .map(item => item.user_id)
  .filter(Boolean);




  const { data: customersData } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      email,
      phone
    `)
    .in("id", userIds);





  function addCustomer(viewings:any[] | null) {

  return viewings?.map(viewing => ({

    ...viewing,

    customer:
      customersData?.find(
        customer => customer.id === viewing.user_id
      ) || null

  })) || [];

}






  const pendingWithCustomer =
    addCustomer(pendingViewings);



  const declinedWithCustomer =
    addCustomer(declinedViewings);



  const latestWithCustomer =
    addCustomer(latestViewings);






  return {


    customers: customers || 0,


    applications: applications || 0,


    viewings: viewings || 0,


    alerts: declinedWithCustomer.length,


    pendingViewings: pendingWithCustomer,


    declinedViewings: declinedWithCustomer,


    latestViewings: latestWithCustomer


  };

}