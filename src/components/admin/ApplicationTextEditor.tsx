"use client";

import { useState } from "react";


export default function ApplicationTextEditor({
  userId,
  initialText,
  updatedAt
}:{
  userId:string;
  initialText:string;
  updatedAt:string | null;
}){


  const [text,setText] =
    useState(initialText || "");


  const [saving,setSaving] =
    useState(false);



  async function saveText(){


    setSaving(true);



    await fetch(
      "/api/admin/customer-message",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          user_id:userId,

          application_text:text

        })

      }
    );



    setSaving(false);


    alert("Bewerbungstext gespeichert");


  }




  async function copyText(){


    await navigator.clipboard.writeText(text);


    alert("Bewerbungstext kopiert");


  }





  return (


    <div className="space-y-4">


      <textarea

        value={text}

        onChange={(e)=>
          setText(e.target.value)
        }

        className="
          min-h-56
          w-full
          rounded-xl
          border
          p-4
        "

        placeholder="Bewerbungstext schreiben..."

      />



      <div className="flex flex-wrap gap-3">


        <button

          onClick={saveText}

          disabled={saving}

          className="
            rounded-xl
            bg-teal-600
            px-6
            py-3
            text-white
          "

        >

          {
            saving
            ?
            "Speichern..."
            :
            "Speichern"
          }

        </button>




        <button

          onClick={copyText}

          className="
            rounded-xl
            border
            px-6
            py-3
          "

        >

          Kopieren

        </button>


      </div>



      <div className="flex justify-between text-sm text-slate-500">


        <span>
          {text.length} Zeichen
        </span>



        <span>

          {
            updatedAt
            ?
            `Zuletzt geändert: ${new Date(updatedAt).toLocaleDateString("de-DE")}`
            :
            "Noch nie gespeichert"
          }

        </span>


      </div>



    </div>


  );


}



