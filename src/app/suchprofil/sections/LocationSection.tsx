﻿"use client";

import {
  useEffect,
  useState
} from "react";


import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

import CityAutocomplete from "../components/CityAutocomplete";
import DistrictSelector from "../components/DistrictSelector";

import {
  MapPin
} from "lucide-react";


import type {
  SearchProfile
} from "../types";



type City = {

  id:string;

  name:string;

  state:string;

};



type Props = {

  profile:SearchProfile;

  update:(
    field:keyof SearchProfile,
    value:any
  )=>void;

};





export default function LocationSection({

profile,

update

}:Props){



const [city,setCity] =
useState<City | null>(null);





useEffect(()=>{


if(
profile.city_id &&
profile.city
){

setCity({

id:profile.city_id,

name:profile.city,

state:""

});


}else{


setCity(null);


}


},[
profile.city_id,
profile.city
]);









function handleCityChange(
selectedCity:City
){


setCity(selectedCity);


update(
"city_id",
selectedCity.id
);


update(
"city",
selectedCity.name
);


update(
"districts",
[]
);


}







const radius =
profile.radius ?? 10;





return (


<Card>


<div className="
space-y-6
">


<SectionTitle

title="Wunschort"

description="Wo möchtest du wohnen?"

icon={MapPin}

/>





<CityAutocomplete

value={city}

onChange={handleCityChange}

/>








<DistrictSelector

cityId={
profile.city_id
}

selected={
profile.districts || []
}

onChange={
districts=>
update(
"districts",
districts
)
}

/>








<div className="
space-y-3
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

Umkreis

</label>


<span className="
font-semibold
text-teal-600
">

{radius} km

</span>


</div>







<input

type="range"

min="1"

max="50"

step="1"

value={radius}

onChange={

e=>
update(
"radius",
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
1 km
</span>


<span>
50 km
</span>


</div>





<p className="
text-xs
text-slate-500
">

Wohnungen werden in diesem Umkreis gesucht.

</p>



</div>






</div>


</Card>


);


}


