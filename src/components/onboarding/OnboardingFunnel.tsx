﻿"use client";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


import ProgressBar from "./ProgressBar";
import StepCard from "./StepCard";


import LocationStep from "./steps/LocationStep";
import ApartmentStep from "./steps/ApartmentStep";
import BudgetStep from "./steps/BudgetStep";
import MoveInStep from "./steps/MoveInStep";
import HouseholdStep from "./steps/HouseholdStep";
import ApplicantStep from "./steps/ApplicantStep";
import DocumentsStep from "./steps/DocumentsStep";
import FinishStep from "./steps/FinishStep";


import { saveOnboarding } from "@/services/onboarding/save-onboarding";



const steps = [
"Standort",
"Wohnung",
"Budget",
"Einzug",
"Haushalt",
"Bewerber",
"Dokumente",
"Fertig"
];





export default function OnboardingFunnel(){



const router = useRouter();



const [step,setStep] = useState(0);

const [saving,setSaving] = useState(false);

const [message,setMessage] = useState("");



const [data,setData] = useState<Record<string,any>>({

city:null,
city_id:null,

radius:10,

rooms:null,
living_space:null,

warm_rent:null,
cold_rent:null,

move_in_date:null,

household_size:1,
children:0,

pets:false,
smoker:false,

employer:"",
job_title:"",
employment_type:"",

net_income:null,

guarantor:false,
wbs:false,
schufa_available:false,
rental_clearance:false

});





useEffect(()=>{


const saved =
localStorage.getItem(
"mietgate_onboarding"
);



if(saved){


try{


const parsed =
JSON.parse(saved);



if(parsed.data){

setData(parsed.data);

}



if(
typeof parsed.step === "number"
){

setStep(parsed.step);

}



}
catch(error){


console.log(
"LOCAL STORAGE ERROR",
error
);


}


}



},[]);








useEffect(()=>{


localStorage.setItem(

"mietgate_onboarding",

JSON.stringify({

data,

step

})

);



},[data,step]);










function update(

key:string,

value:any

){


setData(previous=>({


...previous,


[key]:value



}));

}



function validateStep(){



setMessage("");



if(step===0 && !data.city){


setMessage(
"Bitte wähle zuerst deine Stadt aus."
);


return false;


}





if(step===1 && !data.rooms){


setMessage(
"Bitte wähle die Zimmeranzahl."
);


return false;


}





if(step===2 && !data.warm_rent){


setMessage(
"Bitte gib dein Budget an."
);


return false;


}





if(
step===3 &&
!data.move_in_date &&
!data.move_in_preference
){


setMessage(
"Bitte wähle deinen Einzugstermin."
);


return false;


}





if(step===4 && !data.household){


setMessage(
"Bitte wähle deinen Haushalt aus."
);


return false;


}





if(
step===5 &&
!data.income_type &&
!data.net_income
){


setMessage(
"Bitte vervollständige dein Bewerberprofil."
);


return false;


}



return true;


}










async function next(){



if(!validateStep()){

return;

}



setSaving(true);



try{


await saveOnboarding(data);



setStep(
previous=>previous+1
);



}

catch(error){


console.log(
"STEP SAVE ERROR",
error
);



}

finally{


setSaving(false);


}



}









async function finish(){



setSaving(true);



try{


await saveOnboarding(data);



localStorage.removeItem(
"mietgate_onboarding"
);



router.push("/dashboard");


}

catch(error){


console.log(
"FINISH ERROR",
error
);


}

finally{


setSaving(false);


}


}









return (


<div className="
mx-auto
max-w-xl
px-6
py-10
">







<ProgressBar

current={step}

total={steps.length}

/>








<div className="
mt-8
text-center
">


<p className="
text-sm
font-medium
text-teal-600
">

Schritt {step+1} von {steps.length}

</p>



<h1 className="
mt-2
text-3xl
font-bold
text-slate-900
">

{steps[step]}

</h1>


</div>








<StepCard>




{message &&

<div className="
mb-6
rounded-xl
bg-red-50
p-4
text-sm
font-medium
text-red-700
">

{message}

</div>

}





{step===0 &&
<LocationStep
data={data}
update={update}
/>
}




{step===1 &&
<ApartmentStep
data={data}
update={update}
/>
}





{step===2 &&
<BudgetStep
data={data}
update={update}
/>
}





{step===3 &&
<MoveInStep
data={data}
update={update}
/>
}





{step===4 &&
<HouseholdStep
data={data}
update={update}
/>
}





{step===5 &&
<ApplicantStep
data={data}
update={update}
/>
}





{step===6 &&
<DocumentsStep
data={data}
update={update}
/>
}





{step===7 &&
<FinishStep
data={data}
/>
}









<div className="
mt-10
flex
justify-between
">






<button

disabled={step===0}

onClick={()=>setStep(step-1)}

className="
rounded-xl
border
px-5
py-3
disabled:opacity-40
"

>

Zurück

</button>









{step < steps.length-1 &&

<button

disabled={saving}

onClick={next}

className="
rounded-xl
bg-teal-600
px-6
py-3
font-semibold
text-white
disabled:opacity-50
"

>

{saving ? "Speichert..." : "Weiter"}

</button>

}









{step===steps.length-1 &&

<button

disabled={saving}

onClick={finish}

className="
rounded-xl
bg-teal-600
px-6
py-3
font-semibold
text-white
disabled:opacity-50
"

>

{saving ? "Speichert..." : "MietGate starten"}

</button>

}






</div>





</StepCard>






</div>


);


}

