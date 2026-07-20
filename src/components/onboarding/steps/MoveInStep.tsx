﻿"use client";


import StepHint from "../ui/StepHint";



export default function MoveInStep({

data,
update

}:{

data:any;
update:(key:string,value:any)=>void;

}){



const options = [

{
label:"So schnell wie möglich",
value:"sofort",
description:"Ich suche aktiv"
},

{
label:"In ca. 3 Monaten",
value:"3_monate",
description:"Planbarer Umzug"
},

{
label:"Ich bin flexibel",
value:"flexibel",
description:"Beste Auswahl"
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

Schritt 4

</p>




<h2 className="
mt-2
text-3xl
font-bold
tracking-tight
text-slate-900
">

Wann möchtest du einziehen?

</h2>



<p className="
mt-3
leading-relaxed
text-slate-600
">

Dein Wunschzeitpunkt hilft uns, passende Wohnungen zu priorisieren.

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

Dein gewünschter Einzugstermin

</label>



<div className="
relative
">


<input


type="date"



value={data.move_in_date || ""}



onChange={(e)=>

update(
"move_in_date",
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

transition

focus:border-teal-500

focus:ring-4

focus:ring-teal-100

"

 />


</div>


</div>









<div>


<p className="
mb-3
text-sm
font-semibold
text-slate-700
">

Wie dringend ist deine Suche?

</p>




<div className="
grid
gap-3
md:grid-cols-3
">



{

options.map(option=>(


<button


type="button"


key={option.value}



onClick={()=>update(
"move_in_preference",
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
data.move_in_preference===option.value

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









<StepHint>

Ein passender Einzugstermin erhöht deine Chancen, weil Vermieter häufig gezielt nach passenden Zeiträumen auswählen.

</StepHint>







</div>

);


}

