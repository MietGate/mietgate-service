﻿"use client";


import Button from "@/components/ui/Button";

import type {
  SearchProfile
} from "../types";



type Props = {

  save:()=>void;

  saving:boolean;

  profile:SearchProfile;

};




export default function SaveBar({

save,

saving,

profile

}:Props){



const checks = [

{
label:"Standort",
weight:25,
done:
!!profile.city_id &&
(
!!profile.radius ||
profile.districts.length > 0
)
},


{
label:"Wohnung",
weight:25,
done:
!!profile.rooms &&
!!profile.living_space
},


{
label:"Budget",
weight:20,
done:
!!profile.warm_rent
},


{
label:"Einzug",
weight:15,
done:
!!profile.move_in_date
},


{
label:"Haushalt",
weight:10,
done:
!!profile.household_size
},


{
label:"Zusatzinfos",
weight:5,
done:
profile.pets !== null
}


];




const percentage =
checks.reduce(

(sum,item)=>
sum + (item.done ? item.weight : 0),

0

);




return (


<div className="
sticky
bottom-4
z-30
rounded-2xl
border
border-slate-200
bg-white
p-4
shadow-xl
">



<div className="space-y-4">



<div>


<div className="
flex
justify-between
items-center
mb-2
">


<p className="
font-semibold
text-slate-900
">

Suchprofil Qualität

</p>



<span className="
font-bold
text-teal-600
">

{percentage}%

</span>


</div>




<div className="
h-2
rounded-full
bg-slate-200
overflow-hidden
">


<div

className="
h-full
bg-teal-600
transition-all
"

style={{

width:`${percentage}%`

}}

/>


</div>



</div>






<div className="
flex
items-center
justify-between
gap-4
">


<p className="
text-sm
text-slate-500
">


{

percentage === 100

?

"Dein Suchprofil ist vollständig und bereit für Bewerbungen."

:

"Vervollständige dein Profil für bessere Treffer."

}


</p>



<Button

onClick={save}

loading={saving}

>

{

saving

?

"Speichere..."

:

"Speichern"

}


</Button>



</div>




</div>


</div>


);


}




