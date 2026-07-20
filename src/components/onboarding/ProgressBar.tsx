﻿"use client";


const labels = [
"Standort festlegen",
"Wohnungswunsch",
"Budget prüfen",
"Einzug planen",
"Haushalt",
"Bewerberprofil",
"Dokumente",
"Abschluss"
];


export default function ProgressBar({

 current,
 total

}:{

 current:number;
 total:number;

}){


const progress =
Math.round(
((current+1)/total)*100
);



const remaining =
Math.max(
total - current - 1,
0
);



return (

<div className="
mb-8
">


<div className="
flex
items-center
justify-between
">


<div>


<p className="
text-sm
font-semibold
text-slate-900
">

Dein Mietprofil

</p>


<p className="
mt-1
text-xs
text-slate-500
">

{labels[current]}

</p>


</div>




<div className="
text-right
">


<p className="
text-lg
font-bold
text-teal-600
">

{progress}%

</p>


<p className="
text-xs
text-slate-500
">

{remaining === 0
?
"Fast geschafft"
:
`Noch ${remaining} Schritte`
}

</p>


</div>



</div>





<div className="
mt-4
h-3
overflow-hidden
rounded-full
bg-slate-100
">


<div

className="
h-full
rounded-full
bg-gradient-to-r
from-teal-500
to-emerald-500
transition-all
duration-700
ease-out
"

style={{

width:`${progress}%`

}}

/>


</div>





<div className="
mt-4
rounded-xl
bg-slate-50
px-4
py-3
text-sm
text-slate-600
">


{
progress < 50

?

"Je mehr Angaben du machst, desto besser können wir passende Wohnungen für dich finden."

:

progress < 100

?

"Sehr gut! Dein Profil wird für Vermieter immer aussagekräftiger."

:

"Perfekt! Dein Mietprofil ist vollständig vorbereitet."

}



</div>



</div>

);


}

