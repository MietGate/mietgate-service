﻿export default function FunnelInfo({
title,
children
}:{
title:string,
children:React.ReactNode
}){


return (

<div className="
mt-6
rounded-2xl
border
border-teal-100
bg-teal-50
p-5
">


<p className="
font-semibold
text-teal-900
">

{title}

</p>


<p className="
mt-2
text-sm
text-teal-800
leading-relaxed
">

{children}

</p>


</div>

);


}

