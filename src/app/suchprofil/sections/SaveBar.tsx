"use client";


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
label:"Wunschort",
done:!!profile.city_id
},

{
label:"Wohnung",
done:!!profile.rooms
},

{
label:"Budget",
done:!!profile.warm_rent
},

{
label:"Einzug",
done:!!profile.move_in_date
},

{
label:"Haushalt",
done:!!profile.household_size
}

];





const completed =
checks.filter(
item=>item.done
).length;



const percentage =
Math.round(
(completed / checks.length) * 100
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





<div className="
space-y-4
">





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

Suchprofil

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

{percentage === 100

?

"Dein Profil ist vollständig."

:

"Vervollständige dein Profil für bessere Chancen."

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