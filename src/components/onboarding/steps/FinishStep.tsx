﻿"use client";


import {
CheckCircle2,
MapPin,
Home,
Euro,
Users
} from "lucide-react";



export default function FinishStep({

data

}:{

data:any;

}){



return (

<div className="
space-y-8
">





<div className="
flex
flex-col
items-center
text-center
">


<div className="
flex
h-24
w-24
items-center
justify-center
rounded-full
bg-teal-50
">

<CheckCircle2

size={56}

className="
text-teal-600
"

/>

</div>




<h2 className="
mt-6
text-3xl
font-bold
text-slate-900
">

Dein MietGate Profil ist bereit

</h2>



<p className="
mt-3
max-w-md
leading-relaxed
text-slate-600
">

Super! Deine Wohnungssuche ist vorbereitet.
MietGate kann jetzt mit der Suche und Vorbereitung deiner Bewerbungen starten.

</p>


</div>









<div className="
rounded-3xl
bg-teal-50
border
border-teal-100
p-6
">

<h3 className="
font-bold
text-teal-900
">

Deine Angaben

</h3>




<div className="
mt-5
space-y-4
">


<div className="
flex
items-center
gap-3
">

<MapPin
size={20}
className="text-teal-600"
/>


<div>

<p className="
text-sm
text-teal-800
">

Standort

</p>


<p className="
font-semibold
text-teal-950
">

{data.city || "Nicht angegeben"}

</p>

</div>


</div>







<div className="
flex
items-center
gap-3
">

<Home
size={20}
className="text-teal-600"
/>


<div>

<p className="
text-sm
text-teal-800
">

Wohnung

</p>


<p className="
font-semibold
text-teal-950
">

{data.rooms || "-"} Zimmer

</p>

</div>


</div>








<div className="
flex
items-center
gap-3
">

<Euro
size={20}
className="text-teal-600"
/>


<div>

<p className="
text-sm
text-teal-800
">

Budget

</p>


<p className="
font-semibold
text-teal-950
">

{data.warm_rent || "-"} € Warmmiete

</p>

</div>


</div>








<div className="
flex
items-center
gap-3
">

<Users
size={20}
className="text-teal-600"
/>


<div>

<p className="
text-sm
text-teal-800
">

Haushalt

</p>


<p className="
font-semibold
text-teal-950
">

{data.household || "Nicht angegeben"}

</p>

</div>


</div>




</div>


</div>









<div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
">


<h3 className="
font-bold
text-slate-900
">

Was passiert jetzt?

</h3>



<div className="
mt-5
space-y-4
text-sm
text-slate-600
">


<p>
✓ Wir prüfen dein Suchprofil
</p>


<p>
✓ Wir unterstützen dich bei deinen Bewerbungen
</p>


<p>
✓ Du erhältst Updates im Dashboard
</p>


<p>
✓ MietGate begleitet dich bis zur passenden Wohnung
</p>


</div>


</div>








<div className="
rounded-2xl
bg-slate-50
p-5
text-center
">


<p className="
text-sm
font-medium
text-slate-700
">

Fast geschafft 🚀

</p>


<p className="
mt-2
text-sm
text-slate-500
">

Klicke auf "MietGate starten" und wir legen dein Profil an.

</p>


</div>







</div>


);


}

