"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import LocationSection from "./sections/LocationSection";
import ApartmentSection from "./sections/ApartmentSection";
import BudgetSection from "./sections/BudgetSection";
import MoveInSection from "./sections/MoveInSection";
import HouseholdSection from "./sections/HouseholdSection";
import SaveBar from "./sections/SaveBar";

import type { SearchProfile } from "./types";



const emptyProfile: SearchProfile = {

  city_id: null,
  city: null,
  radius: null,
  rooms: null,
  living_space: null,
  warm_rent: null,
  move_in_date: null,
  household_size: null,
  pets: false,
  districts: [],

};





export default function SearchProfileForm(){


  const [loading,setLoading] =
    useState(true);


  const [saving,setSaving] =
    useState(false);


  const [message,setMessage] =
    useState("");


  const [profile,setProfile] =
    useState<SearchProfile>(
      emptyProfile
    );





  useEffect(()=>{

    loadProfile();

  },[]);





  async function loadProfile(){

    const supabase =
      createClient();


    const {
      data:{
        user
      }
    }
    =
    await supabase.auth.getUser();



    if(!user){

      setLoading(false);

      return;

    }



    const {
      data,
      error
    }
    =
    await supabase
      .from("search_profiles")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .maybeSingle();




    if(error){

      console.log(
        "LOAD PROFILE ERROR",
        error
      );

    }



    if(data){


      const {
        data:districtRows,
        error:districtError
      }
      =
      await supabase
        .from(
          "search_profile_districts"
        )
        .select(
          "district_id"
        )
        .eq(
          "search_profile_id",
          data.id
        );



      if(districtError){

        console.log(
          "DISTRICT LOAD ERROR",
          districtError
        );

      }



      setProfile({

        ...emptyProfile,

        city_id:data.city_id,

        city:data.city,

        radius:data.radius,

        rooms:data.rooms,

        living_space:data.living_space,

        warm_rent:data.warm_rent,

        move_in_date:data.move_in_date,

        household_size:data.household_size,

        pets:data.pets ?? false,

        districts:

          districtRows?.map(
            item =>
              item.district_id
          )
          ||
          []

      });


    }


    setLoading(false);


  }





  function update(
    field:keyof SearchProfile,
    value:any
  ){

    setProfile(
      previous => ({
        ...previous,
        [field]:value
      })
    );

  }





  function getProgress(){

    const checks = [

      !!profile.city_id,

      !!profile.rooms,

      !!profile.warm_rent,

      !!profile.move_in_date,

      !!profile.household_size

    ];


    const completed =
      checks.filter(Boolean).length;


    return Math.round(
      (completed / checks.length) * 100
    );

  }






  async function save(){


    setSaving(true);

    setMessage("");



    const supabase =
      createClient();


    const {
      data:{
        user
      }
    }
    =
    await supabase.auth.getUser();



    if(!user){

      setSaving(false);

      return;

    }
        console.log(
      "SAVE PROFILE",
      profile
    );



    const {

      data:saved,

      error

    }
    =
    await supabase
      .from(
        "search_profiles"
      )
      .upsert(

        {

          user_id:user.id,

          city_id:profile.city_id,

          city:profile.city,

          radius:profile.radius,

          rooms:profile.rooms,

          living_space:profile.living_space,

          warm_rent:profile.warm_rent,

          move_in_date:profile.move_in_date,

          household_size:profile.household_size,

          pets:profile.pets

        },

        {

          onConflict:
          "user_id"

        }

      )
      .select()
      .single();




    if(error){

      console.log(
        "SAVE ERROR",
        error
      );


      alert(
        JSON.stringify(
          error,
          null,
          2
        )
      );


      setSaving(false);

      return;

    }






    const {
      error:deleteError
    }
    =
    await supabase
      .from(
        "search_profile_districts"
      )
      .delete()
      .eq(
        "search_profile_id",
        saved.id
      );




    if(deleteError){

      console.log(
        "DELETE DISTRICTS ERROR",
        deleteError
      );

    }





    if(profile.districts.length){


      const {
        error:insertError
      }
      =
      await supabase
        .from(
          "search_profile_districts"
        )
        .insert(

          profile.districts.map(

            district => ({

              search_profile_id:
              saved.id,

              district_id:
              district

            })

          )

        );



      if(insertError){

        console.log(
          "INSERT DISTRICT ERROR",
          insertError
        );

      }

    }






    setMessage(
      "Suchprofil gespeichert ✓"
    );


    setSaving(false);


  }







  if(loading){

    return (

      <div className="p-6">

        Lade Suchprofil...

      </div>

    );

  }







  return (

    <div className="space-y-8">





      <div className="space-y-5">


        <div>

          <h1 className="
          text-3xl
          font-bold
          text-slate-900
          ">

            Dein Suchprofil

          </h1>


          <p className="
          mt-2
          text-slate-600
          ">

            Erstelle dein persönliches Wohnungsprofil.
            Je genauer deine Angaben sind, desto besser können wir passende Wohnungen finden.

          </p>

        </div>






        <div className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        ">


          <div className="
          flex
          items-center
          justify-between
          mb-3
          ">

            <span className="
            text-sm
            font-medium
            text-slate-700
            ">

              Profil-Fortschritt

            </span>



            <span className="
            text-sm
            font-semibold
            text-teal-600
            ">

              {getProgress()}%

            </span>


          </div>





          <div className="
          h-3
          rounded-full
          bg-slate-100
          overflow-hidden
          ">


            <div

              className="
              h-full
              rounded-full
              bg-teal-600
              transition-all
              "

              style={{

                width:`${getProgress()}%`

              }}

            />


          </div>





          <div className="
          mt-4
          grid
          grid-cols-2
          gap-3
          text-sm
          ">


            <div>✓ Standort</div>

            <div>✓ Wohnung</div>

            <div>✓ Budget</div>

            <div>✓ Einzug</div>

            <div>✓ Haushalt</div>


          </div>


        </div>


      </div>






      <LocationSection

        profile={profile}

        update={update}

      />



      <ApartmentSection

        profile={profile}

        update={update}

      />



      <BudgetSection

        profile={profile}

        update={update}

      />



      <MoveInSection

        profile={profile}

        update={update}

      />



      <HouseholdSection

        profile={profile}

        update={update}

      />






      {
        message &&

        <div className="
        rounded-2xl
        border
        border-teal-200
        bg-teal-50
        p-5
        text-teal-700
        font-medium
        ">

          <div className="
          flex
          items-center
          gap-2
          ">

            <span>✓</span>

            {message}

          </div>


          <p className="
          mt-2
          text-sm
          text-slate-600
          ">

            Dein Suchprofil wurde gespeichert.
            MietGate kann jetzt passende Wohnungen für dich suchen.

          </p>


        </div>

      }







      <SaveBar

        save={save}

        saving={saving}

        profile={profile}

      />






    </div>

  );


}



