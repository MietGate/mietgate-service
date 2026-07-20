﻿"use client";


import StepHint from "../ui/StepHint";



export default function ApplicantStep({

data,
update

}:{

data:any;
update:(key:string,value:any)=>void;

}){



const incomeOptions = [

{
label:"Angestellt",
description:"Festes Einkommen",
value:"angestellt"
},

{
label:"Selbstständig",
description:"Eigenes Unternehmen",
value:"selbststaendig"
},

{
label:"Beamter",
description:"Öffentlicher Dienst",
value:"beamter"
},

{
label:"Student / Ausbildung",
description:"Ausbildung oder Studium",
value:"student"
},

{
label:"Sonstiges",
description:"Andere Situation",
value:"sonstiges"
}

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

Schritt 6

</p>


<h2 className="
mt-2
text-3xl
font-bold
text-slate-900
">

Dein Bewerberprofil

</h2>


<p className="
mt-3
text-slate-600
leading-relaxed
">

Diese Informationen helfen uns, dich gegenüber Vermietern besser vorzubereiten.

</p>


</div>








<StepHint>

Ein vollständiges Profil kann deine Chancen bei Vermietern erhöhen, weil wichtige Informationen bereits vorbereitet sind.

</StepHint>









<div>


<label className="
mb-3
block
text-sm
font-semibold
text-slate-700
">

Berufliche Situation

</label>




<div className="
grid
grid-cols-1
sm:grid-cols-2
gap-3
">



{

incomeOptions.map(item=>(


<button


type="button"


key={item.value}



onClick={()=>update(
"income_type",
item.value
)}



className={`

rounded-2xl

border

p-4

text-left

transition-all

hover:-translate-y-0.5

hover:shadow-md



${
data.income_type===item.value

?

"border-teal-600 bg-teal-50"

:

"border-slate-200 bg-white hover:border-teal-300"

}

`}


>


<p className="
font-semibold
text-slate-900
">

{item.label}

</p>


<p className="
mt-1
text-sm
text-slate-500
">

{item.description}

</p>


</button>


))


}



</div>


</div>









<div>


<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Monatliches Nettoeinkommen

</label>



<div className="
relative
">

<input


type="number"


value={data.income || ""}



onChange={(e)=>
update(
"income",
Number(e.target.value)
)
}



placeholder="z.B. 2500"



className="

w-full

rounded-2xl

border

border-slate-200

px-5

py-4

pr-12

outline-none

focus:border-teal-500

focus:ring-4

focus:ring-teal-100

"

/>


<span className="
absolute
right-5
top-1/2
-translate-y-1/2
text-slate-500
">

€

</span>


</div>


<p className="
mt-2
text-xs
text-slate-500
">

Diese Angabe hilft uns passende Wohnungen innerhalb deines Budgets zu finden.

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

Beschäftigungsdauer

</label>



<select


value={data.employment_duration || ""}



onChange={(e)=>
update(
"employment_duration",
e.target.value
)
}



className="

w-full

rounded-2xl

border

border-slate-200

bg-white

px-5

py-4

outline-none

focus:border-teal-500

focus:ring-4

focus:ring-teal-100

"

>


<option value="">
Bitte auswählen
</option>


<option value="unter1">
Unter 1 Jahr
</option>


<option value="1-3">
1 - 3 Jahre
</option>


<option value="3plus">
Mehr als 3 Jahre
</option>


</select>


</div>








</div>


);


}

