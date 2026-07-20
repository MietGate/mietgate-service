"use client";

import Link from "next/link";
import { useState } from "react";


export default function ApplicationCRM({
  applications
}:{
  applications:any[];
}){


  const [search,setSearch] = useState("");

  const [status,setStatus] = useState("Alle");



  const statuses = [
    "Alle",
    "Vorbereitung",
    "Beworben",
    "Antwort erhalten",
    "Besichtigung",
    "Zusage",
    "Absage"
  ];




  const filtered =
    applications.filter((application)=>{


      const text = `

      ${application.apartment_title || ""}

      ${application.city || ""}

      ${application.address || ""}

      ${application.customer?.full_name || ""}

      ${application.customer?.email || ""}

      `.toLowerCase();



      const matchesSearch =
        text.includes(
          search.toLowerCase()
        );



      const matchesStatus =
        status === "Alle"
        ||
        application.status === status;



      return (
        matchesSearch &&
        matchesStatus
      );


    });







return (

<div>



<div className="grid gap-4 md:grid-cols-2 mb-6">


<input

placeholder="Suche Kunde, Wohnung oder Stadt..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

className="rounded-xl border p-4"

/>



<select

value={status}

onChange={(e)=>
setStatus(e.target.value)
}

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
filtered.map((application)=>(


<Link

key={application.id}

href={`/admin/bewerbungen/${application.id}`}

className="
block
rounded-3xl
bg-white
p-6
shadow-sm
hover:shadow-md
transition
"

>


<div className="flex flex-col gap-3 md:flex-row md:justify-between">


<div>


<h2 className="text-xl font-bold">

{application.apartment_title || "Wohnung"}

</h2>


<p className="mt-1 text-slate-600">

{application.address}

{application.city &&
`, ${application.city}`
}

</p>


<p className="mt-3">

Kunde:

<span className="ml-2 font-semibold">

{
application.customer?.full_name ||
application.customer?.email ||
"-"
}

</span>

</p>


</div>





<div className="text-right">


<span className="
rounded-full
bg-slate-100
px-3
py-1
text-sm
">

{application.status}

</span>


<p className="mt-3 text-sm text-slate-500">

{
new Date(
application.created_at
).toLocaleDateString("de-DE")
}

</p>


</div>



</div>



</Link>


))
}



{
filtered.length === 0 && (

<div className="rounded-2xl bg-white p-8 text-slate-500">

Keine passenden Bewerbungen gefunden.

</div>

)
}



</div>



</div>

);


}



