﻿"use client";

import CityAutocomplete from "@/app/suchprofil/components/CityAutocomplete";
import StepHint from "../ui/StepHint";


export default function LocationStep({

data,
update

}:{

data:any;
update:(key:string,value:any)=>void;

}){


return (

<div className="space-y-7">


<div>


<p className="
text-sm
font-semibold
text-teal-600
">

Schritt 1

</p>


<h2 className="
mt-2
text-3xl
font-bold
tracking-tight
text-slate-900
">

Wo möchtest du wohnen?

</h2>



<p className="
mt-3
leading-relaxed
text-slate-600
">

Wir nutzen deine Wunschregion, um gezielt passende Wohnungen für dich zu finden.

</p>


</div>





<div>


<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Deine Wunschstadt

</label>



<CityAutocomplete

value={data.city}

onChange={(city:any)=>{


update(
"city",
city
);


}}





/>


</div>






<div>


<label className="
mb-3
block
text-sm
font-semibold
text-slate-700
">

Wie weit darf die Wohnung entfernt sein?

</label>




<div className="
grid
grid-cols-2
gap-3
md:grid-cols-4
">


{

[5,10,20,50].map(radius=>(


<button


key={radius}


type="button"


onClick={()=>update(
"radius",
radius
)}



className={`

rounded-2xl
border
px-4
py-4
font-medium
transition-all
duration-200


hover:-translate-y-0.5
hover:shadow-md


${
data.radius===radius

?

"border-teal-600 bg-teal-50 text-teal-700 shadow-sm"

:

"border-slate-200 bg-white text-slate-700 hover:border-teal-300"

}

`}



>


{radius} km


</button>


))


}


</div>



</div>







<StepHint>

Je genauer deine Suche ist, desto besser können wir passende Wohnungen auswählen. Ein größerer Radius erhöht deine Chancen auf erfolgreiche Bewerbungen.

</StepHint>




</div>


);


}

