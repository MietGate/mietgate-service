"use client";


import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";


import {
  Users,
  PawPrint
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





export default function HouseholdSection({

  profile,

  update

}:Props){



const persons = [

1,

2,

3,

4

];






return (

<Card>


<SectionTitle

title="Haushalt"

description="Wer wird in der Wohnung leben?"

icon={Users}

/>







<div className="
mt-6
space-y-6
">






<div>


<label className="
block
text-sm
font-medium
text-slate-700
mb-3
">

Personen

</label>





<div className="
grid
grid-cols-4
gap-3
">



{
persons.map(person=>(


<button

key={person}

type="button"

onClick={()=>update(

"household_size",

person

)}

className={`

rounded-xl

border

px-4

py-3

font-medium

transition


${

profile.household_size === person

?

"bg-teal-600 text-white border-teal-600"

:

"bg-white text-slate-700 border-slate-200 hover:border-teal-400"

}

`}


>

{

person === 4

?

"4+"

:

person

}


</button>


))

}


</div>


</div>









<label className="
flex
items-center
gap-3
rounded-xl
border
p-4
cursor-pointer
hover:border-teal-400
transition
">


<input

type="checkbox"

checked={
profile.pets
}

onChange={

e=>

update(

"pets",

e.target.checked

)

}

className="
h-5
w-5
"

 />




<PawPrint size={22}/>



<div>


<div className="
font-medium
text-slate-800
">

Haustiere

</div>


<div className="
text-sm
text-slate-500
">

Hund, Katze oder andere Tiere

</div>


</div>



</label>






</div>


</Card>


);


}