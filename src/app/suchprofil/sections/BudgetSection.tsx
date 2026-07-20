﻿"use client";


import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import SectionTitle from "@/components/ui/SectionTitle";


import {
  Euro
} from "lucide-react";


import type {
  SearchProfile
} from "../types";



type Props = {

  profile: SearchProfile;

  update: (
    field:keyof SearchProfile,
    value:any
  ) => void;

};





export default function BudgetSection({

profile,

update

}:Props){



const min = 300;

const max = 5000;


const value =
profile.warm_rent ?? 1000;



const percentage =
(
(value - min) /
(max - min)
) * 100;






return (

<Card>


<SectionTitle

title="Budget"

description="Wie hoch darf deine Warmmiete maximal sein?"

icon={Euro}

/>






<div className="
mt-6
space-y-6
">







<Input

label="Maximale Warmmiete"

type="number"

value={value}

onChange={

e=>

update(
"warm_rent",
Number(
e.target.value
)
)

}

/>







<div className="
space-y-4
">



<div className="
flex
justify-between
items-center
">

<span className="
text-sm
text-slate-500
">

300 €

</span>



<span className="
text-xl
font-bold
text-teal-600
">

{value} €

</span>



<span className="
text-sm
text-slate-500
">

5000 €

</span>


</div>







<div className="
relative
h-5
flex
items-center
">



<div className="
absolute
left-0
right-0
h-3
rounded-full
bg-slate-200
"/>




<div

className="
absolute
left-0
h-3
rounded-full
bg-teal-600
"

style={{

width:`${percentage}%`

}}

/>





<input

type="range"

min={min}

max={max}

step="50"

value={value}

onChange={

e=>

update(
"warm_rent",
Number(
e.target.value
)
)

}

className="
absolute
w-full
h-5
appearance-none
bg-transparent
cursor-pointer
accent-teal-600
"

/>



</div>







<div className="
flex
justify-between
text-xs
text-slate-500
">

<span>
300 €
</span>

<span>
5000 €
</span>

</div>






</div>






<p className="
text-xs
text-slate-500
">

Ziehe den Regler oder gib den Betrag direkt ein.

</p>





</div>


</Card>


);


}




