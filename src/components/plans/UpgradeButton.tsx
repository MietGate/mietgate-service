"use client";

import { useState } from "react";


type Props = {

  plan:"basic"|"premium";

};



export default function UpgradeButton({
  plan
}:Props){


  const [loading,setLoading] = useState(false);



  if(plan === "premium"){

    return null;

  }



  async function startCheckout(){


    try{


      setLoading(true);



      const response =
        await fetch("/api/stripe/checkout",{

          method:"POST"

        });



      const data =
        await response.json();



      if(data.url){

        window.location.href = data.url;

      }


    }
    catch(error){

      console.error(error);

      alert("Stripe konnte nicht gestartet werden.");

    }
    finally{

      setLoading(false);

    }


  }




  return (

    <button

      onClick={startCheckout}

      disabled={loading}

      className="
      mt-3
      block
      w-full
      rounded-xl
      bg-teal-600
      px-3
      py-2
      text-center
      text-sm
      font-semibold
      text-white
      transition
      hover:bg-teal-700
      disabled:opacity-50
      "

    >

      {
        loading
        ?
        "Weiterleitung..."
        :
        "Auf Premium upgraden"
      }


    </button>

  );


}



