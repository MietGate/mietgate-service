﻿export default function StepHint({

children

}:{

children:React.ReactNode

}){


return (

<div

className="
mt-5
rounded-2xl
border
border-teal-100
bg-gradient-to-br
from-teal-50
to-emerald-50
p-5
"

>


<div

className="
flex
gap-3
"

>


<div

className="
mt-1
h-2
w-2
rounded-full
bg-teal-600
"

></div>



<p

className="
text-sm
leading-relaxed
text-teal-900
"

>

{children}

</p>


</div>


</div>

);


}

