﻿"use client";


import StepHint from "../ui/StepHint";



export default function BudgetStep({

data,
update

}:{

data:any;
update:(key:string,value:any)=>void;

}){



const budgets = [
800,
1000,
1200,
1500,
1800
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

Schritt 3

</p>



<h2 className="
mt-2
text-3xl
font-bold
tracking-tight
text-slate-900
">

Welche Miete passt zu dir?

</h2>



<p className="
mt-3
leading-relaxed
text-slate-600
">

Wir suchen nur Wohnungen, die zu deinem Budget passen und realistische Chancen bieten.

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

Maximale Warmmiete

</label>




<div className="
relative
">


<input


type="number"


placeholder="z.B. 1200"


value={data.warm_rent || ""}



onChange={(e)=>

update(
"warm_rent",
Number(e.target.value)
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

pr-12

text-lg

font-medium

outline-none

transition

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
font-semibold
">

€

</span>


</div>


</div>







<div>


<p className="
mb-3
text-sm
font-semibold
text-slate-700
">

Schnellauswahl

</p>




<div className="
grid
grid-cols-2
gap-3
md:grid-cols-5
">


{

budgets.map(amount=>(


<button


type="button"


key={amount}



onClick={()=>update(
"warm_rent",
amount
)}



className={`

rounded-2xl

border

px-4

py-4

font-semibold

transition-all

hover:-translate-y-0.5

hover:shadow-md



${
data.warm_rent===amount

?

"border-teal-600 bg-teal-50 text-teal-700"

:

"border-slate-200 bg-white hover:border-teal-300"

}

`}


>


{amount} €


</button>


))


}


</div>


</div>








<StepHint>

Vermieter achten besonders darauf, ob Einkommen und Miete zusammenpassen. Ein realistisches Budget hilft uns, bessere Bewerbungen für dich zu erstellen.

</StepHint>






</div>

);


}

