"use client";

import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

import {
  Home
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





export default function ApartmentSection({

  profile,

  update

}: Props){



const rooms = [
  {
    label:"Egal",
    value:null
  },
  {
    label:"1",
    value:1
  },
  {
    label:"2",
    value:2
  },
  {
    label:"3",
    value:3
  },
  {
    label:"4",
    value:4
  },
  {
    label:"5+",
    value:5
  }
];




const space =
profile.living_space ?? 60;





return (


<Card>


<SectionTitle

title="Wohnung"

description="Welche Wohnung suchst du?"

icon={Home}

/>





<div className="
mt-6
space-y-8
">







<div>


<label className="
block
text-sm
font-medium
text-slate-700
mb-3
">

Zimmer

</label>






<div className="
grid
grid-cols-3
sm:grid-cols-6
gap-2
">


{

rooms.map(room=>(


<button

key={room.label}

type="button"

onClick={()=>update(
"rooms",
room.value
)}

className={`

rounded-xl

border

py-3

font-medium

transition


${
profile.rooms === room.value

?

"bg-teal-600 text-white border-teal-600"

:

"bg-white text-slate-700 border-slate-200 hover:border-teal-400"

}

`}

>

{room.label}


</button>


))


}



</div>


</div>









<div className="
space-y-4
">





<div className="
flex
justify-between
items-center
">


<label className="
text-sm
font-medium
text-slate-700
">

Wohnfläche

</label>


<span className="
font-semibold
text-teal-600
">

{space} m²

</span>


</div>







<input

type="range"

min="20"

max="250"

step="5"

value={space}

onChange={

e=>

update(

"living_space",

Number(
e.target.value
)

)

}

className="
w-full
h-3
rounded-lg
cursor-pointer
accent-teal-600
"

/>







<div className="
flex
justify-between
text-xs
text-slate-500
">

<span>
20 m²
</span>

<span>
250 m²
</span>


</div>









<input

type="number"

min="20"

max="250"

value={space}

onChange={

e=>

update(

"living_space",

Number(
e.target.value
)

)

}

className="
w-full
rounded-xl
border
border-slate-200
px-4
py-3

outline-none

focus:border-teal-500
focus:ring-2
focus:ring-teal-100

"

/>







<p className="
text-xs
text-slate-500
">

Nutze den Regler oder gib die Wohnfläche direkt ein.

</p>




</div>






</div>



</Card>


);


}