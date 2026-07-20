﻿"use client";


import StepHint from "../ui/StepHint";



export default function DocumentsStep({

data,
update

}:{

data:any;
update:(key:string,value:any)=>void;

}){



const documents = [

{
key:"id_document",
title:"Ausweis",
description:"Personalausweis oder Reisepass"
},

{
key:"income_proof",
title:"Einkommensnachweis",
description:"Gehaltsabrechnungen oder Nachweis"
},

{
key:"employment_proof",
title:"Arbeitsnachweis",
description:"Arbeitsvertrag oder Bestätigung"
},

{
key:"credit_report",
title:"Schufa / Bonität",
description:"Falls vorhanden"
}

];




const uploadedCount =
documents.filter(
(doc)=>data[doc.key]
).length;




return (

<div className="
space-y-8
">





<div>


<p className="
text-sm
font-semibold
text-teal-600
">

Schritt 7

</p>



<h2 className="
mt-2
text-3xl
font-bold
text-slate-900
">

Deine Unterlagen

</h2>



<p className="
mt-3
leading-relaxed
text-slate-600
">

Mit vorbereiteten Unterlagen können wir dich schneller und professioneller bei Vermietern präsentieren.

</p>


</div>







<StepHint>

Du kannst fehlende Dokumente jederzeit später im Dashboard ergänzen. Starte auch ohne vollständige Unterlagen.

</StepHint>








<div className="
rounded-2xl
bg-teal-50
border
border-teal-100
p-5
">


<div className="
flex
items-center
justify-between
">


<p className="
font-semibold
text-teal-900
">

Bewerbungsmappe

</p>


<span className="
rounded-full
bg-white
px-3
py-1
text-sm
font-semibold
text-teal-700
">

{uploadedCount}/{documents.length}

</span>


</div>



<p className="
mt-2
text-sm
text-teal-800
">

Je vollständiger deine Unterlagen sind, desto einfacher können Vermieter deine Bewerbung prüfen.

</p>


</div>









<div className="
space-y-4
">


{

documents.map(doc=>(


<div


key={doc.key}



className={`

rounded-2xl

border

p-5

transition-all



${
data[doc.key]

?

"border-teal-200 bg-teal-50"

:

"border-slate-200 bg-white"

}

`}



>


<div className="
flex
items-center
justify-between
gap-4
">



<div>


<h3 className="
font-semibold
text-slate-900
">

{doc.title}

</h3>



<p className="
mt-1
text-sm
text-slate-500
">

{doc.description}

</p>


</div>






<label


className="

cursor-pointer

rounded-xl

bg-teal-600

px-4

py-2

text-sm

font-semibold

text-white

transition

hover:bg-teal-700

"

>


{

data[doc.key]

?

"Ändern"

:

"Hochladen"

}



<input


type="file"


className="hidden"



onChange={(e)=>

update(

doc.key,

e.target.files?.[0] || null

)

}



/>


</label>




</div>








{

data[doc.key] && (


<p className="
mt-4
text-sm
font-semibold
text-teal-700
">

✓ Dokument ausgewählt

</p>


)


}




</div>


))


}



</div>








<div className="
rounded-2xl
border
border-slate-200
bg-slate-50
p-5
">


<h3 className="
font-semibold
text-slate-900
">

Noch nicht alles vorhanden?

</h3>


<p className="
mt-2
text-sm
leading-relaxed
text-slate-600
">

Kein Problem. Nach dem Start kannst du weitere Unterlagen jederzeit in deinem MietGate Dashboard hochladen.

</p>


</div>







</div>

);


}

