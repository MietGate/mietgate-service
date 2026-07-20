"use client";

import { useState } from "react";


export default function CustomerCRMDetail({
  customer
}:{
  customer:any;
}){


  const {
    profile,
    viewings
  } = customer;



  const [text,setText] =
    useState(profile.application_text || "");


  const [saving,setSaving] =
    useState(false);




  function copyProfile(){


    const content = `Kundenprofil MietGate

Name:
${profile.full_name}

Email:
${profile.email}

Stadt:
${profile.city}

Budget:
${profile.budget} Euro

Zimmer:
${profile.rooms}

Einzug:
${profile.move_in_date}

Haushalt:
${profile.household}

Einkommen:
${profile.income}

Haustiere:
${profile.pets}

Raucher:
${profile.smoker}


Erstelle einen professionellen Bewerbungstext für eine Wohnung.
`;



    navigator.clipboard.writeText(content);


    alert("Kundendaten kopiert");


  }





  async function saveApplicationText(){


    setSaving(true);



    const response =
      await fetch(
        "/api/admin/customers/update-text",
        {

          method:"PATCH",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({

            user_id:profile.id,

            application_text:text

          })

        }
      );




    if(response.ok){


      alert(
        "Bewerbungstext gespeichert"
      );


    }else{


      alert(
        "Fehler beim Speichern"
      );


    }



    setSaving(false);


  }





  return (


    <main className="min-h-screen bg-slate-50 p-8">


      <div className="mx-auto max-w-6xl space-y-6">





        <section className="rounded-3xl bg-white p-8 shadow">


          <h1 className="text-3xl font-bold">
            {profile.full_name}
          </h1>


          <p className="text-slate-500">
            {profile.email}
          </p>


        </section>







        <section className="rounded-3xl bg-white p-8 shadow">


          <h2 className="text-xl font-bold">
            Suchprofil
          </h2>



          <div className="mt-5 grid gap-4 md:grid-cols-2">


            <Info
              label="Stadt"
              value={profile.city}
            />


            <Info
              label="Budget"
              value={`${profile.budget || "-"} Euro`}
            />


            <Info
              label="Zimmer"
              value={profile.rooms}
            />


            <Info
              label="Einzug"
              value={profile.move_in_date}
            />


            <Info
              label="Haushalt"
              value={profile.household}
            />


            <Info
              label="Einkommen"
              value={profile.income}
            />


            <Info
              label="Haustiere"
              value={profile.pets}
            />


            <Info
              label="Raucher"
              value={profile.smoker}
            />


          </div>


        </section>








        <section className="rounded-3xl bg-white p-8 shadow">



          <h2 className="text-xl font-bold">
            Daten fuer ChatGPT
          </h2>




          <button


            onClick={copyProfile}


            className="
            mt-5
            rounded-xl
            bg-teal-600
            px-5
            py-3
            text-white
            "


          >


            Profil kopieren


          </button>




        </section>








        <section className="rounded-3xl bg-white p-8 shadow">



          <h2 className="text-xl font-bold">
            Interner Bewerbungstext
          </h2>




          <p className="mt-2 text-sm text-slate-500">
            Nur für MietGate sichtbar. Der Kunde sieht diesen Text nicht.
          </p>




          <textarea


            value={text}


            onChange={(e)=>
              setText(
                e.target.value
              )
            }


            className="
            mt-5
            min-h-40
            w-full
            rounded-xl
            border
            p-4
            "


          />




          <button


            onClick={saveApplicationText}


            disabled={saving}


            className="
            mt-4
            rounded-xl
            bg-teal-600
            px-5
            py-3
            text-white
            disabled:opacity-50
            "


          >


            {
              saving
              ?
              "Speichere..."
              :
              "Bewerbungstext speichern"
            }



          </button>




        </section>









        <section className="rounded-3xl bg-white p-8 shadow">



          <h2 className="text-xl font-bold">
            Besichtigungen
          </h2>




          {
            viewings.length === 0 && (

              <p className="mt-4 text-slate-500">
                Keine Termine
              </p>

            )
          }






          {
            viewings.map((viewing:any)=>(


              <div

                key={viewing.id}

                className="
                mt-4
                rounded-xl
                border
                p-4
                "

              >


                <b>
                  {viewing.title}
                </b>


                <p>
                  {viewing.viewing_date}
                </p>



              </div>


            ))
          }




        </section>





      </div>



    </main>


  );

}







function Info({
 label,
 value
}:{
 label:string;
 value:any;
}){


  return (


    <div>


      <p className="text-sm text-slate-500">
        {label}
      </p>



      <p className="font-semibold">
        {value || "-"}
      </p>



    </div>


  );


}