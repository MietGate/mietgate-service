"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
} from "lucide-react";


export default function CTASection() {

  return (

    <section className="px-6 py-24">

      <motion.div

        initial={{
          opacity:0,
          y:30,
        }}

        whileInView={{
          opacity:1,
          y:0,
        }}

        viewport={{
          once:true,
        }}

        transition={{
          duration:0.6,
        }}

        className="
          mx-auto
          max-w-5xl
          overflow-hidden
          rounded-3xl
          bg-slate-900
          px-8
          py-16
          text-center
          text-white
          sm:px-16
        "
      >


        <div
          className="
            mx-auto
            flex
            w-fit
            items-center
            gap-2
            rounded-full
            bg-white/10
            px-5
            py-2
            text-sm
            font-medium
            text-teal-300
          "
        >

          <ShieldCheck size={18}/>

          Geld-zurück-Garantie inklusive

        </div>



        <h2 className="
          mt-8
          text-4xl
          font-bold
          leading-tight
          sm:text-5xl
        "
        >
          Finde deine Wohnung
          <br />
          ohne Bewerbungsstress.
        </h2>



        <p className="
          mx-auto
          mt-6
          max-w-2xl
          text-lg
          leading-8
          text-slate-300
        "
        >
          Erstelle dein Suchprofil und überlasse MietGate
          die professionelle Vorbereitung und Unterstützung
          deiner Mietbewerbungen.
        </p>



        <div className="
          mt-10
          flex
          flex-col
          justify-center
          gap-4
          sm:flex-row
        "
        >

          <button
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-teal-500
              px-8
              py-4
              font-semibold
              text-white
              transition
              hover:bg-teal-600
            "
          >

            Jetzt starten

            <ArrowRight size={18}/>

          </button>



          <button
            className="
              rounded-xl
              border
              border-white/20
              px-8
              py-4
              font-semibold
              text-white
              transition
              hover:bg-white/10
            "
          >

            Mehr erfahren

          </button>


        </div>



      </motion.div>


    </section>

  );
}