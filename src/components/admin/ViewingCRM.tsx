"use client";

import Link from "next/link";
import { useState } from "react";


export default function ViewingCRM({
  viewings
}:{
  viewings:any[];
}){


  const [search,setSearch] = useState("");

  const [status,setStatus] = useState("Alle");



  const statuses = [
    "Alle",
    "pending",
    "accepted",
    "declined"
  ];



  const filtered =
    viewings.filter((viewing)=>{


      const text = `
      ${viewing.title || ""}
      ${viewing.address || ""}
      ${viewing.city || ""}
      ${viewing.customer?.full_name || ""}
      ${viewing.customer?.email || ""}
      `.toLowerCase();



      const matchesSearch =
        text.includes(
          search.toLowerCase()
        );


      const matchesStatus =
        status === "Alle"
        ||
        viewing.status === status;



      return matchesSearch && matchesStatus;


    });





return (

<div>


<div className="grid gap-4 md:grid-cols-2 mb-6">


<input
placeholder="Suche Kunde, Wohnung oder Adresse..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="rounded-xl border p-4"
/>



<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
className="rounded-xl border p-4"
>

{
statuses.map((item)=>(

<option
key={item}
value={item}
>
{item}
</option>

))
}

</select>


</div>





<div className="space-y-5">


{
filtered.map((viewing)=>(


<div
key={viewing.id}
className="rounded-3xl bg-white p-6 shadow-sm"
>


<div className="flex flex-col gap-5 md:flex-row md:justify-between">



<div>


<h2 className="text-xl font-bold">
{viewing.title || "Wohnung"}
</h2>


<p className="text-slate-600">
{viewing.address}, {viewing.city}
</p>



<div className="mt-4">

<p className="font-semibold">
Kunde
</p>

<p>
{viewing.customer?.full_name || "-"}
</p>

<p className="text-sm text-slate-500">
{viewing.customer?.email || "-"}
</p>

</div>




<div className="mt-4">

<p>
Datum: {viewing.viewing_date}
</p>

<p>
Uhrzeit: {viewing.viewing_time}
</p>

</div>


</div>




<div className="flex flex-col gap-3">


<span className="rounded-full bg-slate-100 px-4 py-2 text-center">

{viewing.status}

</span>



<Link
href={`/admin/kunden/${viewing.user_id}`}
className="rounded-xl bg-teal-600 px-5 py-3 text-center text-white"
>
Kunde öffnen
</Link>


</div>



</div>



</div>


))
}



{
filtered.length === 0 && (

<div className="rounded-2xl bg-white p-8 text-slate-500">
Keine Besichtigungen gefunden.
</div>

)
}


</div>


</div>

);


}



