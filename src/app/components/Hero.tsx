"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">

      <motion.div
        initial={{opacity:0,y:30}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.7}}
      >

        <h1 className="text-5xl font-bold leading-tight text-slate-900">
          Du suchst eine Wohnung.
          <br />
          Wir übernehmen den Rest.
        </h1>

        <p className="mt-6 text-xl font-medium text-slate-700">
          MietGate übernimmt deine Mietbewerbungen und begleitet dich bis zu deinen Besichtigungsterminen.
        </p>

        <p className="mt-5 max-w-xl text-lg text-slate-600">
          Erstelle einmal dein Suchprofil und lehne dich zurück.
          Wir kümmern uns um den Bewerbungsprozess, damit du Zeit sparst und bessere Chancen hast.
        </p>


        <div className="mt-8 flex gap-4">

          <button className="rounded-xl bg-teal-500 px-7 py-3 font-semibold text-white hover:bg-teal-600">
            Suchprofil erstellen
          </button>

          <button className="rounded-xl border border-slate-300 px-7 py-3 font-semibold text-slate-700">
            So funktioniert es
          </button>

        </div>


        <div className="mt-8 space-y-2 text-slate-600">

          <p>? Keine eigenen Bewerbungen mehr schreiben</p>
          <p>? Professionelles Bewerberprofil</p>
          <p>? Garantierte Besichtigungstermine</p>

        </div>

      </motion.div>


      <motion.div
        initial={{opacity:0,scale:0.95}}
        animate={{opacity:1,scale:1}}
        transition={{duration:0.8}}
        className="relative"
      >

        <Image
          src="/hero-mietgate.jpg"
          alt="MietGate Bewerbungsservice für Mietwohnungen"
          width={800}
          height={600}
          className="rounded-3xl shadow-xl"
        />


        <div className="absolute bottom-8 left-8 rounded-2xl bg-white p-6 shadow-xl">

          <p className="text-sm text-slate-500">
            MietGate übernimmt für dich
          </p>

          <div className="mt-4 space-y-3 text-sm">
            <p>? Suchprofil erstellt</p>
            <p>? Bewerbungen übernommen</p>
            <p>? Besichtigungen erhalten</p>
          </div>

        </div>

      </motion.div>

    </section>
  );
}

