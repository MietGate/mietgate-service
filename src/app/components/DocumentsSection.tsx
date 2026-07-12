"use client";

import { motion } from "framer-motion";

export default function DocumentsSection() {
  return (
    <section className="bg-slate-50 px-6 py-24">

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">


        <motion.div
          initial={{opacity:0,x:-30}}
          whileInView={{opacity:1,x:0}}
          viewport={{once:true}}
        >

          <h2 className="text-4xl font-bold text-slate-900">
            Alles vorbereitet,
            <br />
            wenn es darauf ankommt.
          </h2>


          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Hinterlege wichtige Unterlagen optional und habe
            deine wichtigsten Informationen übersichtlich an einem Ort.
          </p>


          <div className="mt-8 space-y-4 text-slate-700">

            <p>? Mieterselbstauskunft vorbereitet</p>
            <p>? Einkommensnachweise hinterlegen</p>
            <p>? Dokumente zentral verwalten</p>

          </div>


        </motion.div>



        <motion.div
          initial={{opacity:0,scale:0.95}}
          whileInView={{opacity:1,scale:1}}
          viewport={{once:true}}
          className="rounded-3xl bg-white p-8 shadow-xl"
        >

          <p className="text-sm text-slate-500">
            MietGate Dokumente
          </p>


          <h3 className="mt-4 text-2xl font-bold text-slate-900">
            Bewerbungsunterlagen
          </h3>


          <div className="mt-8 space-y-4">


            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-medium">
                ? Mieterselbstauskunft
              </p>
              <p className="text-sm text-slate-500">
                Bereitgestellt
              </p>
            </div>


            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-medium">
                ? Einkommensnachweis
              </p>
              <p className="text-sm text-slate-500">
                Hinterlegt
              </p>
            </div>


            <div className="rounded-xl bg-teal-50 p-4">
              <p className="font-semibold text-teal-600">
                Profil vollständig ?
              </p>
            </div>


          </div>


        </motion.div>


      </div>

    </section>
  );
}

