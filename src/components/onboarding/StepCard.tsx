﻿"use client";


export default function StepCard({

children

}:{

children:React.ReactNode

}){


return (

<div

className="
relative
overflow-hidden
rounded-3xl
border
border-slate-200
bg-white
p-8
shadow-[0_20px_50px_rgba(15,23,42,0.08)]
transition-all
duration-500
hover:shadow-[0_25px_70px_rgba(15,23,42,0.12)]
"


>


<div

className="
absolute
right-0
top-0
h-32
w-32
rounded-full
bg-teal-100
opacity-40
blur-3xl
"

/>



<div

className="
relative
z-10
"

>


{children}


</div>



</div>

);


}

