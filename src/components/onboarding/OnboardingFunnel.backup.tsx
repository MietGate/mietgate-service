﻿"use client";

import { useState } from "react";

import ProgressBar from "./ProgressBar";
import StepCard from "./StepCard";

import LocationStep from "./steps/LocationStep";
import ApartmentStep from "./steps/ApartmentStep";

const steps = [
"Standort",
"Wohnung",
"Budget",
"Einzug",
"Haushalt",
"Bewerber",
"Dokumente",
"Fertig"
];


export default function OnboardingFunnel(){


const [step,setStep]=useState(0);


const [data,setData]=useState<any>({});


function update(
key:string,
value:any
){

setData({

...data,

[key]:value

});

}



return (

<div className="
mx-auto
max-w-xl
px-6
py-10
">


<ProgressBar
current={step}
total={steps.length}
/>



<StepCard>


{
step===0 && (

<LocationStep

data={data}

update={update}

/>

)
}


{
step===1 && (

<ApartmentStep

data={data}

update={update}

/>

)
}



{
step>0 && (

<div>

<h2 className="
text-2xl
font-bold
">

{steps[step]}

</h2>

<p className="mt-3 text-slate-600">

Dieser Schritt wird als naechstes gebaut.

</p>

</div>

)
}



<div className="
mt-10
flex
justify-between
">


<button

disabled={step===0}

onClick={()=>setStep(step-1)}

className="
rounded-xl
border
px-5
py-3
"

>

Zurueck

</button>



<button

onClick={()=>setStep(step+1)}

disabled={step===steps.length-1}

className="
rounded-xl
bg-teal-600
px-5
py-3
font-semibold
text-white
"

>

Weiter

</button>


</div>



</StepCard>


</div>

);


}

