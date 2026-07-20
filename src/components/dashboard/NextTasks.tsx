﻿"use client";


import {
  CheckCircle2,
  CircleAlert,
  ArrowRight
} from "lucide-react";



export default function NextTasks({

profile,
searchProfile,
documents

}:{

profile:any;
searchProfile:any;
documents:any[];

}){





const tasks = [



{

title:"Suchprofil erstellen",

done:
!!searchProfile,

description:
"Deine Wohnungskriterien sind hinterlegt."

},





{

title:"Bewerberdaten vervollständigen",

done:
!!profile?.income,

description:
"Einkommen hilft Vermietern bei der Auswahl."

},





{

title:"Dokumente hochladen",

done:
documents?.length >= 3,

description:
"Vollständige Unterlagen erhöhen deine Chancen."

},





{

title:"Bewerbungstext erstellen",

done:
!!profile?.application_message,

description:
"Eine persönliche Nachricht macht deine Bewerbung stärker."

}



];







const openTasks =
tasks.filter(
(task)=>!task.done
);







return (


<div

className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
"

>


<div className="flex items-center justify-between">


<div>


<h2 className="
text-xl
font-bold
text-slate-900
">

Deine nächsten Schritte

</h2>


<p className="
mt-1
text-sm
text-slate-500
">

{openTasks.length === 0

?

"Dein Profil ist vollständig."

:

"Vervollständige dein Profil für bessere Chancen."

}

</p>


</div>



<ArrowRight

className="text-teal-600"

/>


</div>









<div className="
mt-6
space-y-4
">


{

tasks.map((task)=>(


<div

key={task.title}

className={`
flex
items-start
gap-4
rounded-2xl
p-4

${
task.done

?

"bg-teal-50"

:

"bg-slate-50"

}

`}

>


{
task.done

?

<CheckCircle2

className="text-teal-600"
size={22}

/>

:

<CircleAlert

className="text-orange-500"
size={22}

/>

}




<div>


<h3 className="
font-semibold
text-slate-900
">

{task.title}

</h3>



<p className="
mt-1
text-sm
text-slate-600
">

{task.description}

</p>



</div>



</div>


))


}



</div>





</div>


);



}

