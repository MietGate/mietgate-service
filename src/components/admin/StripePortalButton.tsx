"use client";

import { useState } from "react";


export default function StripePortalButton(
  {
    customerId
  }:
  {
    customerId:string
  }
){


  const [loading,setLoading] =
    useState(false);



  async function openPortal(){


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


    setLoading(false);


  }




  return (

    <button

      onClick={openPortal}

      disabled={loading}

      className="
      mt-3
      rounded-xl
      bg-teal-600
      px-4
      py-2
      text-sm
      font-semibold
      text-white
      hover:bg-teal-700
      disabled:opacity-50
      "

    >

      {
        loading
        ?
        "Öffne Stripe..."
        :
        "Abo in Stripe verwalten"
      }

    </button>

  );

}



