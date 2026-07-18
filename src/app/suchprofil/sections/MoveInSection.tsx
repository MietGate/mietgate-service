"use client";


import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import SectionTitle from "@/components/ui/SectionTitle";


import {
  CalendarDays
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







export default function MoveInSection({

profile,

update

}:Props){





const options = [

{
label:"Sofort",
months:0
},

{
label:"In 1 Monat",
months:1
},

{
label:"In 3 Monaten",
months:3
}

];







function setMonths(months:number){


const date = new Date();


date.setMonth(
date.getMonth()+months
);



update(

"move_in_date",

date.toISOString()
.split("T")[0]

);


}






function isSelected(months:number){


if(!profile.move_in_date){
return false;
}


const selected =
new Date(
profile.move_in_date
);


const today =
new Date();


const diffMonths =
(
selected.getFullYear() - today.getFullYear()
) * 12
+
selected.getMonth()
-
today.getMonth();



return diffMonths === months;


}








return (

<Card>


<SectionTitle

title="Einzug"

description="Wann möchtest du einziehen?"

icon={CalendarDays}

/>







<div className="
mt-6
space-y-6
">







<div className="
grid
gap-3
sm:grid-cols-3
">



{

options.map(option=>(


<button

key={option.label}

type="button"

onClick={()=>setMonths(option.months)}

className={`

rounded-xl

border

px-4

py-3

font-medium

transition


${

isSelected(option.months)

?

"bg-teal-600 text-white border-teal-600"

:

"bg-white text-slate-700 border-slate-200 hover:border-teal-400"

}

`}

>

{option.label}


</button>


))


}


</div>









<div>

<label className="
block
text-sm
font-medium
text-slate-700
mb-2
">

Oder gewünschtes Datum wählen

</label>




<Input

type="date"

value={
profile.move_in_date ?? ""
}

onChange={

e=>

update(

"move_in_date",

e.target.value

)

}


/>


</div>








</div>


</Card>


);


}