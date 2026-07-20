﻿"use client";

import {
  CheckCircle2,
  Circle,
  Search,
  FileCheck,
  CalendarDays,
  UserCheck
} from "lucide-react";


const steps = [

  {
    title:"Suchprofil erstellt",
    text:"Deine Wohnungskriterien sind gespeichert.",
    icon:CheckCircle2,
    done:true
  },


  {
    title:"Unterlagen vorbereitet",
    text:"Deine Bewerbungsunterlagen werden geprüft.",
    icon:FileCheck,
    done:true
  },


  {
    title:"Wohnungssuche läuft",
    text:"MietGate sucht passende Möglichkeiten nach deinen Kriterien.",
    icon:Search,
    done:true
  },


  {
    title:"MietGate übernimmt die nächsten Schritte",
    text:"Wir kümmern uns um die Kontaktaufnahme und Vorbereitung.",
    icon:UserCheck,
    done:false
  },


  {
    title:"Besichtigung erhalten",
    text:"Sobald eine passende Wohnung gefunden wurde, informieren wir dich.",
    icon:CalendarDays,
    done:false
  }

];



export default function RentalJourney(){


return (

<div
className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
"
>

<h2
className="
text-xl
font-bold
text-slate-900
"
>
Dein Weg zur Wohnung
</h2>


<p
className="
mt-2
text-sm
text-slate-500
"
>
MietGate begleitet dich Schritt für Schritt bis zur passenden Wohnung.
</p>




<div
className="
mt-6
space-y-5
"
>


{
steps.map((step,index)=>{


const Icon = step.icon;


return (

<div
key={index}
className="
flex
gap-4
"
>


<div className="mt-1">

{
step.done

?

<CheckCircle2
className="text-teal-600"
/>

:

<Circle
className="text-slate-300"
/>

}

</div>




<div>


<div
className="
flex
items-center
gap-2
font-semibold
text-slate-900
"
>

<Icon size={18}/>

{step.title}

</div>



<p
className="
mt-1
text-sm
text-slate-500
"
>

{step.text}

</p>


</div>


</div>

)


})

}


</div>


</div>

);


}

