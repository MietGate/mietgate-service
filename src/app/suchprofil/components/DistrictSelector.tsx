﻿"use client";

import {
  useEffect,
  useState
} from "react";


import {
  createClient
} from "@/lib/supabase/client";



type District = {

  id:string;

  name:string;

};



type Props = {

  cityId:string | null;

  selected:string[];

  onChange:(districts:string[])=>void;

};





export default function DistrictSelector({

  cityId,

  selected,

  onChange

}:Props){



const [districts,setDistricts] =
useState<District[]>([]);



const [search,setSearch] =
useState("");



const [loading,setLoading] =
useState(false);








useEffect(()=>{


if(!cityId){

setDistricts([]);

return;

}


loadDistricts();


},[cityId]);







async function loadDistricts(){


const supabase =
createClient();


setLoading(true);



const {
data,
error
}
=
await supabase
.from("districts")
.select(
"id,name"
)
.eq(
"city_id",
cityId
)
.order(
"name"
);



if(!error){

setDistricts(
data ?? []
);

}


setLoading(false);


}









function toggleDistrict(id:string){


if(selected.includes(id)){


onChange(

selected.filter(
item=>item!==id
)

);


}else{


onChange(

[
...selected,
id
]

);


}



}









const filtered =
districts.filter(
district=>

district.name
.toLowerCase()
.includes(
search.toLowerCase()
)

);









return (


<div className="
mt-5
space-y-4
">





<div>

<h3 className="
text-sm
font-semibold
text-slate-800
">

Stadtteile

</h3>


<p className="
text-sm
text-slate-500
mt-1
">

Wähle die bevorzugten Stadtteile aus.

</p>


</div>







<input

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

placeholder="Stadtteil suchen..."

value={search}

onChange={
e=>
setSearch(
e.target.value
)
}


/>









{
loading &&

<p className="
text-sm
text-slate-500
">

Lade Stadtteile...

</p>

}









{
!loading &&
filtered.length > 0 &&


<div className="
grid
gap-2
sm:grid-cols-2
">


{

filtered.map(district=>(


<label

key={district.id}

className={`

flex
items-center
gap-3
rounded-xl
border
p-3
cursor-pointer
transition


${
selected.includes(district.id)

?

"border-teal-500 bg-teal-50"

:

"border-slate-200 bg-white"

}

`}


>


<input

type="checkbox"

checked={
selected.includes(
district.id
)
}

onChange={()=>
toggleDistrict(
district.id
)
}

className="
h-4
w-4
accent-teal-600
"

/>


<span className="
text-sm
text-slate-800
">

{district.name}

</span>


</label>


))


}


</div>

}





{
selected.length > 0 &&


<div className="
rounded-xl
bg-teal-50
px-4
py-3
text-sm
text-teal-700
font-medium
">

{selected.length} Stadtteil
{
selected.length !== 1
?
"e"
:
""
}
 ausgewählt

</div>


}





{
!loading &&
cityId &&
districts.length === 0 &&


<p className="
text-sm
text-slate-500
">

Für diese Stadt sind noch keine Stadtteile hinterlegt.

</p>


}




</div>


);


}




