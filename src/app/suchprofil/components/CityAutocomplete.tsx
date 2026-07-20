"use client";


import {
  useEffect,
  useState
} from "react";


import {
  createClient
} from "@/lib/supabase/client";



type City = {

  id:string;

  name:string;

  state:string;

};





type Props = {

  value:City | null;

  onChange:(city:City)=>void;

};






export default function CityAutocomplete({

  value,

  onChange

}:Props){



const [search,setSearch] =
useState(
  value?.name ?? ""
);



const [results,setResults] =
useState<City[]>([]);



const [open,setOpen] =
useState(false);



const [loading,setLoading] =
useState(false);






useEffect(()=>{

setSearch(
  value?.name ?? ""
);

},[value]);









useEffect(()=>{


if(search.length < 2){

setResults([]);

return;

}





const timeout =
setTimeout(async()=>{


const supabase =
createClient();



setLoading(true);




const {
data,
error
}
=
await supabase
.from("cities")
.select(
"id,name,state"
)
.ilike(
"name",
`${search}%`
)
.limit(10);





if(!error){

setResults(
data ?? []
);

}



setLoading(false);



},300);





return ()=>clearTimeout(timeout);



},[search]);









function selectCity(city:City){


setSearch(
city.name
);


setOpen(false);



onChange(
city
);


}









function handleChange(
text:string
){


setSearch(
text
);


setOpen(true);



}




return (


<div className="
relative
">





<input

className="
w-full
rounded-xl
border
border-slate-200
bg-white
px-4
py-3
text-slate-900

outline-none

focus:border-teal-500
focus:ring-2
focus:ring-teal-100
"


value={search}



onChange={

e=>

handleChange(
e.target.value
)

}



placeholder="Stadt suchen..."



/>








{
loading &&

<div className="
absolute
right-4
top-3
text-xs
text-slate-400
">

Suche...

</div>

}









{
open &&
results.length > 0 &&


<div className="
absolute
z-50
mt-2
w-full
rounded-xl
border
border-slate-200
bg-white
shadow-lg
overflow-hidden
">


{

results.map(city=>(


<button

type="button"

key={city.id}

onClick={()=>selectCity(city)}

className="
w-full
px-4
py-3
text-left
hover:bg-slate-50
"


>


<div className="
font-medium
text-slate-900
">

{city.name}

</div>


<div className="
text-sm
text-slate-500
">

{city.state}

</div>


</button>


))


}



</div>


}






</div>


);


}


