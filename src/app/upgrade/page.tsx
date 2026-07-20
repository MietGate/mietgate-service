﻿"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import {
  Crown,
  Check
} from "lucide-react";

import Card from "@/components/ui/Card";


const features = [
  "Mindestens 5 garantierte Besichtigungen",
  "Priorisierte Bearbeitung deiner Bewerbungen",
  "Persönliche Unterstützung",
  "Mehr Betreuung durch MietGate",
];



export default function UpgradePage(){


const router = useRouter();

const [loading,setLoading] = useState(false);

const [checking,setChecking] = useState(true);



useEffect(()=>{


async function checkUser(){


const supabase = createClient();


const {
data:{
user
}
}
=
await supabase.auth.getUser();



if(!user){

router.push("/login");

return;

}


setChecking(false);


}



checkUser();


},[router]);





async function startCheckout(){


try{


setLoading(true);


const response =
await fetch(
"/api/stripe/checkout",
{
method:"POST"
}
);



const data =
await response.json();



if(data.url){

window.location.href=data.url;

}
else{

console.log(data);

alert("Checkout konnte nicht gestartet werden.");

}



}
catch(error){

console.error(error);

alert("Stripe Fehler");

}
finally{

setLoading(false);

}


}





if(checking){

return (

<div className="p-10 text-center">

Prüfe Anmeldung...

</div>

);

}




return (

<div className="min-h-screen bg-slate-50 p-6">


<div className="mx-auto max-w-xl">


<Card className="p-8">


<div className="flex items-center gap-3">


<Crown
size={34}
className="text-teal-600"
/>


<h1 className="text-3xl font-bold text-slate-900">

MietGate Premium

</h1>


</div>




<p className="mt-4 text-slate-600">

Mehr Unterstützung bei deiner Wohnungssuche
und bessere Chancen auf deine Wunschwohnung.

</p>




<div className="mt-6 space-y-3">


{
features.map(feature=>(


<div
key={feature}
className="flex items-center gap-3"
>


<Check
size={20}
className="text-teal-600"
/>


<span>

{feature}

</span>


</div>


))
}


</div>




<div className="mt-8 rounded-xl bg-teal-50 p-5">


<p className="text-sm text-teal-700">

Premium Tarif

</p>


<p className="mt-1 text-3xl font-bold">

49 € / Monat

</p>


</div>




<button

onClick={startCheckout}

disabled={loading}

className="
mt-8
w-full
rounded-xl
bg-teal-600
px-4
py-3
font-semibold
text-white
"


>


{
loading
?
"Weiterleitung..."
:
"Jetzt Premium aktivieren"
}


</button>



</Card>


</div>


</div>

);


}

