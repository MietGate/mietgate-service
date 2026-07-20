"use client";

import { useState } from "react";


export default function NewViewingForm({
  customers,
  applicationId,
  defaultValues,
}: {
  customers:any[];
  applicationId?:string;
  defaultValues?:{
    user_id?:string;
    title?:string;
    address?:string;
    city?:string;
    listing_url?:string;
  };
}) {



  const [loading,setLoading] =
    useState(false);



  const [form,setForm] =
    useState({

      user_id:
        defaultValues?.user_id || "",

      title:
        defaultValues?.title || "",

      address:
        defaultValues?.address || "",

      city:
        defaultValues?.city || "",

      listing_url:
        defaultValues?.listing_url || "",

      viewing_date:"",
      viewing_time:""

    });





  function updateField(
    key:string,
    value:string
  ){

    setForm({

      ...form,

      [key]:value

    });

  }





  async function createViewing(){


    setLoading(true);



    const response =
      await fetch(
        "/api/viewings",
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({

            ...form,

            application_id:
              applicationId || null

          })

        }
      );




    if(response.ok){

      window.location.href =
        "/admin/besichtigungen";

    }
    else{

      alert(
        "Fehler beim Erstellen"
      );

    }


    setLoading(false);


  }






  return (

    <div className="space-y-5">



      <select

        value={form.user_id}

        onChange={(e)=>
          updateField(
            "user_id",
            e.target.value
          )
        }

        className="w-full rounded-xl border p-3"

      >

        <option value="">
          Kunde auswählen
        </option>


        {
          customers.map(customer=>(

            <option
              key={customer.id}
              value={customer.id}
            >

              {customer.full_name || customer.email}

            </option>

          ))
        }


      </select>





      <input
        placeholder="Wohnungstitel"
        value={form.title}
        onChange={(e)=>
          updateField(
            "title",
            e.target.value
          )
        }
        className="w-full rounded-xl border p-3"
      />





      <input
        placeholder="Adresse"
        value={form.address}
        onChange={(e)=>
          updateField(
            "address",
            e.target.value
          )
        }
        className="w-full rounded-xl border p-3"
      />





      <input
        placeholder="Stadt"
        value={form.city}
        onChange={(e)=>
          updateField(
            "city",
            e.target.value
          )
        }
        className="w-full rounded-xl border p-3"
      />





      <input
        placeholder="Link zum Inserat"
        value={form.listing_url}
        onChange={(e)=>
          updateField(
            "listing_url",
            e.target.value
          )
        }
        className="w-full rounded-xl border p-3"
      />





      <div className="grid gap-4 md:grid-cols-2">


        <input
          type="date"
          value={form.viewing_date}
          onChange={(e)=>
            updateField(
              "viewing_date",
              e.target.value
            )
          }
          className="rounded-xl border p-3"
        />



        <input
          type="time"
          value={form.viewing_time}
          onChange={(e)=>
            updateField(
              "viewing_time",
              e.target.value
            )
          }
          className="rounded-xl border p-3"
        />


      </div>





      <button

        disabled={loading}

        onClick={createViewing}

        className="rounded-xl bg-teal-600 px-6 py-3 text-white"

      >

        {
          loading
          ?
          "Erstelle..."
          :
          "Besichtigung erstellen"
        }


      </button>


    </div>

  );

}



