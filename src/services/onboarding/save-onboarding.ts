﻿import { createClient } from "@/lib/supabase/client";


export async function saveOnboarding(
  data:any
){

  const supabase = createClient();


  const {
    data:{
      user
    }
  } = await supabase.auth.getUser();



  if(!user){

    throw new Error(
      "Kein Benutzer eingeloggt"
    );

  }



  const {
    error:profileError
  } = await supabase
    .from("search_profiles")
    .upsert(

      {

        user_id:user.id,


        city:
        data.city,

        city_id:
        data.city_id,


        radius:
        data.radius,


        rooms:
        data.rooms,


        living_space:
        data.living_space,


        cold_rent:
        data.cold_rent,


        warm_rent:
        data.warm_rent,


        move_in_date:
        data.move_in_date,


        household_size:
        data.household_size,


        children:
        data.children,


        pets:
        data.pets,


        smoker:
        data.smoker,


        employer:
        data.employer,


        job_title:
        data.job_title,


        employment_type:
        data.employment_type,


        net_income:
        data.net_income,


        guarantor:
        data.guarantor,


        wbs:
        data.wbs,


        schufa_available:
        data.schufa_available,


        rental_clearance:
        data.rental_clearance,


        updated_at:
        new Date().toISOString()

      },


      {
        onConflict:
        "user_id"
      }

    );



  if(profileError){

    console.log(
      "ONBOARDING SAVE ERROR",
      profileError
    );


    throw profileError;

  }





  await supabase
    .from("profiles")
    .update({

      profile_completed:true

    })
    .eq(
      "id",
      user.id
    );



  return true;


}

