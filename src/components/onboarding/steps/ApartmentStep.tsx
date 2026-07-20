﻿"use client";


import StepHint from "../ui/StepHint";



export default function ApartmentStep({

data,
update

}:{

data:any;
update:(key:string,value:any)=>void;

}){



const rooms = [
"1",
"2",
"3",
"4",
"5+"
];



const sizes = [
40,
60,
80,
100,
120,
150
];



const types = [
"Wohnung",
"Einfamilienhaus",
"WG",
"Egal"
];





return (

<div className="
space-y-8
">





<div>


<p className="
text-sm
font-semibold
text-teal-600
">

Schritt 2

</p>



<h2 className="
mt-2
text-3xl
font-bold
tracking-tight
text-slate-900
">

Welche Wohnung passt zu dir?

</h2>



<p className="
mt-3
leading-relaxed
text-slate-600
">

Wir nutzen deine Wünsche, damit wir nur passende Wohnungen für dich auswählen.

</p>


</div>









<div>


<label className="
mb-3
block
text-sm
font-semibold
text-slate-700
">

Wie viele Zimmer brauchst du?

</label>



<div className="
grid
grid-cols-5
gap-3
">


{

rooms.map(room=>(


<button


type="button"


key={room}


onClick={()=>update(
"rooms",
Number(room.replace("+",""))
)}



className={`

rounded-2xl
border
py-4
font-semibold
transition-all
duration-200


hover:-translate-y-0.5
hover:shadow-md


${
data.rooms === Number(room.replace("+",""))

?

"border-teal-600 bg-teal-50 text-teal-700 shadow-sm"

:

"border-slate-200 bg-white hover:border-teal-300"

}

`}


>

{room}


</button>


))


}


</div>


</div>









<div>


<label className="
mb-3
block
text-sm
font-semibold
text-slate-700
">

Welche Wohnfläche stellst du dir vor?

</label>




<div className="
grid
grid-cols-3
gap-3
md:grid-cols-6
">


{

sizes.map(size=>(


<button


type="button"


key={size}


onClick={()=>update(
"living_space",
size
)}



className={`

rounded-2xl
border
py-3
font-medium
transition-all


hover:-translate-y-0.5


${
data.living_space===size

?

"border-teal-600 bg-teal-50 text-teal-700"

:

"border-slate-200 hover:border-teal-300"

}

`}



>

{size} m²


</button>


))


}


</div>


</div>









<div>


<label className="
mb-3
block
text-sm
font-semibold
text-slate-700
">

Welche Art von Zuhause suchst du?

</label>



<div className="
grid
grid-cols-2
gap-3
">


{

types.map(type=>(


<button


type="button"


key={type}



onClick={()=>update(
"property_type",
type
)}



className={`

rounded-2xl
border
px-4
py-4
font-medium
transition-all


hover:-translate-y-0.5
hover:shadow-md


${
data.property_type===type

?

"border-teal-600 bg-teal-50 text-teal-700"

:

"border-slate-200 hover:border-teal-300"

}

`}


>


{type}


</button>


))


}


</div>


</div>







<StepHint>

Eine realistische Wohnungsgröße und Zimmeranzahl erhöhen deine Chancen auf passende Angebote. Wir berücksichtigen deine Wünsche bei der Auswahl.

</StepHint>





</div>


);


}

