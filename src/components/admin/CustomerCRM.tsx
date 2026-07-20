"use client";

import Link from "next/link";
import { useState } from "react";


export default function CustomerCRM({
  customers
}:{
  customers:any[];
}){


  const [search,setSearch] = useState("");



  const filtered = customers.filter((customer)=>{


    const text =
      `
      ${customer.full_name || ""}
      ${customer.email || ""}
      ${customer.city || ""}
      `
      .toLowerCase();



    return text.includes(
      search.toLowerCase()
    );

  });




  return (

    <div>


      <input

        placeholder="Kunde suchen..."

        value={search}

        onChange={(e)=>
          setSearch(e.target.value)
        }

        className="
        mb-6
        w-full
        rounded-xl
        border
        p-4
        "

      />





      <div className="
        grid
        gap-5
        md:grid-cols-2
        lg:grid-cols-3
      ">


      {
        filtered.map((customer)=>(


          <Link

            key={customer.id}

            href={`/admin/kunden/${customer.id}`}

            className="
            rounded-3xl
            border
            bg-white
            p-6
            shadow-sm
            hover:shadow-md
            transition
            "

          >


            <div className="flex justify-between">


              <h3 className="font-bold text-lg">

                {customer.full_name || "Unbekannt"}

              </h3>



              {
                customer.application_text ?

                <span className="
                rounded-full
                bg-green-100
                px-3
                py-1
                text-xs
                text-green-700
                ">
                  Bewerbung ✓
                </span>

                :

                <span className="
                rounded-full
                bg-yellow-100
                px-3
                py-1
                text-xs
                text-yellow-700
                ">
                  Text fehlt
                </span>

              }


            </div>




            <p className="mt-3 text-sm text-slate-500">
              {customer.email}
            </p>


            <p className="mt-2">
              📍 {customer.city || "-"}
            </p>


            <p>
              💰 {customer.budget || "-"} €
            </p>


            <p>
              🏠 {customer.rooms || "-"} Zimmer
            </p>



            <div className="mt-4">

              {
                customer.profile_completed ?

                <span className="
                rounded-full
                bg-teal-100
                px-3
                py-1
                text-xs
                text-teal-700
                ">
                  Profil fertig
                </span>

                :

                <span className="
                rounded-full
                bg-red-100
                px-3
                py-1
                text-xs
                text-red-700
                ">
                  Profil offen
                </span>

              }

            </div>


          </Link>


        ))

      }


      </div>


    </div>

  );

}



