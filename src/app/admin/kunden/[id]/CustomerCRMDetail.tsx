"use client";

import { useState } from "react";
import Link from "next/link";


export default function CustomerCRMDetail({
  customer
}:{
  customer:any;
}){


  const {
    profile,
    applications,
    viewings,
    documents
  } = customer;



  const [text,setText] =
    useState(
      profile.application_text || ""
    );


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





  async function saveText(){


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


<Link
href="/admin/kunden"
className="text-teal-600"
>
← Alle Kunden
</Link>




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


<Info label="Stadt" value={profile.city}/>

<Info label="Budget" value={`${profile.budget || "-"} Euro`}/>

<Info label="Zimmer" value={profile.rooms}/>

<Info label="Einzug" value={profile.move_in_date}/>

<Info label="Haushalt" value={profile.household}/>

<Info label="Einkommen" value={profile.income}/>

<Info label="Haustiere" value={profile.pets}/>

<Info label="Raucher" value={profile.smoker}/>


</div>


</section>







<section className="rounded-3xl bg-white p-8 shadow">


<h2 className="text-xl font-bold">
Daten fuer ChatGPT
</h2>


<button
onClick={copyProfile}
className="mt-5 rounded-xl bg-teal-600 px-5 py-3 text-white"
>
Profil kopieren
</button>


</section>







<section className="rounded-3xl bg-white p-8 shadow">


<h2 className="text-xl font-bold">
Interner Bewerbungstext
</h2>


<p className="mt-2 text-sm text-slate-500">
Nur für MietGate sichtbar.
</p>



<textarea

value={text}

onChange={(e)=>
setText(e.target.value)
}

className="mt-5 min-h-40 w-full rounded-xl border p-4"

/>



<button

onClick={saveText}

disabled={saving}

className="mt-4 rounded-xl bg-teal-600 px-5 py-3 text-white"

>

{
saving
?
"Speichern..."
:
"Bewerbungstext speichern"
}

</button>



</section>







<section className="rounded-3xl bg-white p-8 shadow">


<h2 className="text-xl font-bold">
Bewerbungen
</h2>



{
applications.length === 0 && (

<p className="mt-4 text-slate-500">
Noch keine Bewerbungen
</p>

)
}



<div className="mt-5 space-y-4">


{
applications.map((app:any)=>(


<div
key={app.id}
className="rounded-2xl border bg-slate-50 p-5"
>


<h3 className="font-bold text-lg">
{app.apartment_title || "Wohnung"}
</h3>


<p>
{app.address}, {app.city}
</p>


<span className="mt-3 inline-block rounded-full bg-slate-200 px-3 py-1 text-sm">
{app.status}
</span>



<Link
href={`/admin/bewerbungen/${app.id}`}
className="mt-4 inline-block rounded-xl bg-teal-600 px-4 py-2 text-white"
>
Öffnen
</Link>


</div>


))
}


</div>


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
className="mt-4 rounded-2xl border bg-slate-50 p-5"
>


<h3 className="font-bold">
{viewing.title}
</h3>


<p>
Datum: {viewing.viewing_date}
</p>


<p>
Uhrzeit: {viewing.viewing_time}
</p>



<span
className={`
mt-3 inline-block rounded-full px-3 py-1 text-sm

${
viewing.status === "accepted"
?
"bg-green-100 text-green-700"
:
viewing.status === "declined"
?
"bg-red-100 text-red-700"
:
"bg-yellow-100 text-yellow-700"
}

`}
>

{
viewing.status === "accepted"
?
"Zugesagt"
:
viewing.status === "declined"
?
"Abgesagt"
:
"Offen"
}

</span>


</div>


))
}



</section>









<section className="rounded-3xl bg-white p-8 shadow">


<h2 className="text-xl font-bold">
Dokumente
</h2>


{
documents.length === 0
?
<p className="mt-4 text-slate-500">
Keine Dokumente vorhanden
</p>
:
<p className="mt-4">
{documents.length} Dokumente vorhanden
</p>
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