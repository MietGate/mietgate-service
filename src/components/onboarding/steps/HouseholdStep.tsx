﻿"use client";


import StepHint from "../ui/StepHint";



export default function HouseholdStep({

data,
update

}:{

data:any;
update:(key:string,value:any)=>void;

}){



const householdOptions = [

{
label:"Allein",
description:"Eine Person",
value:"allein"
},

{
label:"Paar",
description:"Zwei Personen",
value:"paar"
},

{
label:"Familie",
description:"Mit Kindern",
value:"familie"
},

{
label:"WG",
description:"Mehrere Personen",
value:"wg"
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

Schritt 5

</p>



<h2 className="
mt-2
text-3xl
font-bold
tracking-tight
text-slate-900
">

Wer zieht ein?

</h2>



<p className="
mt-3
leading-relaxed
text-slate-600
">

Damit wir Wohnungen finden, die wirklich zu deiner Lebenssituation passen.

</p>


</div>








<div>


<p className="
mb-3
text-sm
font-semibold
text-slate-700
">

Dein Haushalt

</p>



<div className="
grid
grid-cols-2
gap-3
">


{

householdOptions.map(option=>(


<button


type="button"


key={option.value}



onClick={()=>update(
"household",
option.value
)}



className={`

rounded-2xl

border

p-5

text-left

transition-all

hover:-translate-y-0.5

hover:shadow-md



${
data.household===option.value

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

{option.label}

</p>


<p className="
mt-1
text-sm
text-slate-500
">

{option.description}

</p>


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

Wie viele Personen ziehen ein?

</label>



<input


type="number"


min="1"



value={data.household_size || ""}



onChange={(e)=>

update(
"household_size",
Number(e.target.value)
)

}



placeholder="z.B. 2"



className="

w-full

rounded-2xl

border

border-slate-200

px-5

py-4

outline-none

transition

focus:border-teal-500

focus:ring-4

focus:ring-teal-100

"

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

Gehören Haustiere dazu?

</label>




<div className="
grid
grid-cols-2
gap-3
">



{

[
{
label:"Ja",
value:true
},
{
label:"Nein",
value:false
}

].map(item=>(


<button


type="button"


key={item.label}



onClick={()=>update(
"pets",
item.value
)}



className={`

rounded-2xl

border

py-4

font-semibold

transition-all



${
data.pets===item.value

?

"border-teal-600 bg-teal-50 text-teal-700"

:

"border-slate-200 hover:border-teal-300"

}

`}



>


{item.label}


</button>


))


}



</div>


</div>








<StepHint>

Diese Angaben helfen uns, Wohnungen auszuwählen, bei denen die Wohnungsgröße und die Vermieter-Anforderungen besser passen.

</StepHint>






</div>


);


}

