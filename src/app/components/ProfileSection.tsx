"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfileSection() {

return (

<section className="bg-white px-6 py-24">

<div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">


<motion.div
initial={{opacity:0,x:-30}}
whileInView={{opacity:1,x:0}}
viewport={{once:true}}
>

<Image
src="/profile-mietgate.jpg"
alt="MietGate Bewerberprofil"
width={800}
height={600}
className="rounded-3xl shadow-xl"
/>

</motion.div>



<div>

<h2 className="text-4xl font-bold text-slate-900">
Dein persönliches
<br />
MietGate Bewerberprofil.
</h2>


<p className="mt-6 text-lg text-slate-600">
Alle wichtigen Informationen werden übersichtlich vorbereitet,
damit deine Bewerbungen professionell auftreten.
</p>



<div className="mt-8 rounded-3xl bg-slate-50 p-6">


<p className="text-sm text-slate-500">
Dein MietGate Profil
</p>


<div className="mt-5 space-y-3">

<p>? Wunschwohnung hinterlegt</p>

<p>? Suchkriterien gespeichert</p>

<p>? Dokumente optional bereitgestellt</p>

<p>? Bereit für Bewerbungen</p>


</div>


</div>


</div>


</div>


</section>

);

}

