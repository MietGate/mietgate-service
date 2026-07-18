"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import {
  ArrowRight,
  ShieldCheck,
  Clock3,
  BadgeCheck,
} from "lucide-react";


export default function HeroContent() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -40,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      className="max-w-xl"
    >

      {/* Badge */}
      <div className="inline-flex items-center rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
        🇩🇪 Deutschlands moderner Mietbewerbungsservice
      </div>



      {/* Headline */}
      <h1 className="mt-8 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">

        Wohnung finden.
        <br />

        <span className="text-teal-600">
          Ohne Bewerbungsstress.
        </span>

      </h1>




      {/* Beschreibung */}
      <p className="mt-6 text-lg leading-7 text-slate-600 sm:text-xl sm:leading-8">

        MietGate übernimmt deine Mietbewerbungen, verwaltet deine Unterlagen
        und erhöht deine Chancen auf Besichtigungstermine.

      </p>




      {/* Buttons */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">


        <Link
          href="/start"
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-teal-600
            px-7
            py-4
            font-semibold
            text-white
            transition
            hover:bg-teal-700
          "
        >

          Kostenlos starten

          <ArrowRight size={18}/>

        </Link>





        <a
          href="#prozess"
          className="
            rounded-2xl
            border
            border-slate-300
            bg-white
            px-7
            py-4
            text-center
            font-semibold
            text-slate-700
            transition
            hover:bg-slate-50
          "
        >

          So funktioniert's

        </a>



      </div>






      {/* Trust Elemente */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">



        <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">


          <ShieldCheck
            className="text-teal-600"
            size={22}
          />


          <span className="text-sm font-medium">
            DSGVO-konform
          </span>


        </div>





        <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">


          <Clock3
            className="text-teal-600"
            size={22}
          />


          <span className="text-sm font-medium">
            Spart Zeit
          </span>


        </div>





        <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">


          <BadgeCheck
            className="text-teal-600"
            size={22}
          />


          <span className="text-sm font-medium">
            Professionell
          </span>


        </div>



      </div>



    </motion.div>
  );
}

