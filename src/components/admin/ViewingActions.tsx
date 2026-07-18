"use client";

import { useState } from "react";


export default function ViewingActions({
  id,
  currentStatus
}: {
  id:string;
  currentStatus:string;
}) {


  const [loading,setLoading] =
    useState(false);



  async function updateStatus(
    status:string
  ){

    setLoading(true);


    await fetch(
      "/api/admin/viewings",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({

          id,

          status

        })
      }
    );


    window.location.reload();

  }





  const buttons = [

    {
      label:"Geplant",
      value:"geplant",
      style:"bg-slate-600"
    },

    {
      label:"Bestätigt",
      value:"bestätigt",
      style:"bg-teal-600"
    },

    {
      label:"Abgesagt",
      value:"abgesagt",
      style:"bg-red-600"
    },

    {
      label:"Erledigt",
      value:"erledigt",
      style:"bg-blue-600"
    }

  ];





  return (

    <div className="flex flex-col gap-2">


      {
        buttons.map(button=>(


          <button

            key={button.value}

            disabled={
              loading ||
              currentStatus === button.value
            }


            onClick={()=>
              updateStatus(
                button.value
              )
            }


            className={`
              rounded-xl
              px-4
              py-2
              text-white
              ${button.style}
              disabled:opacity-40
            `}

          >

            {button.label}

          </button>


        ))
      }


    </div>

  );

}