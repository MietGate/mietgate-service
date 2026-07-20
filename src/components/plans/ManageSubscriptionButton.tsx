"use client";

import { useState } from "react";


export default function ManageSubscriptionButton(){


  const [loading,setLoading] =
    useState(false);



  async function openPortal(){


    try{

      setLoading(true);


      const response =
        await fetch(
          "/api/stripe/portal",
          {
            method:"POST"
          }
        );


      const data =
        await response.json();



      if(data.url){

        window.location.href =
          data.url;

      }


    }
    catch(error){

      console.error(error);

      alert(
        "Abo-Verwaltung konnte nicht geöffnet werden."
      );

    }
    finally{

      setLoading(false);

    }


  }



  return (

    <button

      onClick={openPortal}

      disabled={loading}

      className="
      mt-3
      block
      w-full
      rounded-xl
      border
      border-teal-600
      px-3
      py-2
      text-sm
      font-semibold
      text-teal-700
      hover:bg-teal-50
      disabled:opacity-50
      "

    >

      {
        loading
        ?
        "Öffne..."
        :
        "Abo verwalten"
      }

    </button>

  );


}



