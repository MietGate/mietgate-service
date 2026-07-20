"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  FileText,
  Upload,
  ShieldCheck,
} from "lucide-react";

const documents = [
  "Mieterselbstauskunft",
  "Einkommensnachweise",
  "Schufa & wichtige Dokumente",
];

export default function DocumentsSection() {
  return (
    <section className="bg-slate-50 px-6 py-24">

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">


        {/* Text */}
        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
        >

          <p className="text-sm font-semibold text-teal-600">
            Bewerbungsunterlagen
          </p>


          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Deine Bewerbungsmappe.
            <br />
            Immer bereit.
          </h2>


          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Hinterlege deine wichtigsten Unterlagen einmalig.
            MietGate nutzt diese Informationen, um professionelle
            Bewerbungen für deine Wohnungssuche vorzubereiten.
          </p>


          <div className="mt-8 space-y-4">

            {documents.map((document) => (
              <div
                key={document}
                className="flex items-center gap-3"
              >

                <CheckCircle2
                  size={22}
                  className="text-teal-600"
                />

                <span className="text-slate-700">
                  {document}
                </span>

              </div>
            ))}

          </div>


        </motion.div>



        {/* Mockup */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="rounded-3xl bg-white p-8 shadow-xl"
        >

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50">
              <FileText
                className="text-teal-600"
                size={24}
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                MietGate Dokumente
              </p>

              <h3 className="text-2xl font-bold text-slate-900">
                Bewerbungsmappe
              </h3>
            </div>

          </div>


          <div className="mt-8 space-y-4">


            <div className="rounded-xl bg-slate-50 p-4">

              <div className="flex items-center gap-3">

                <Upload
                  size={20}
                  className="text-teal-600"
                />

                <div>
                  <p className="font-medium text-slate-900">
                    Mieterselbstauskunft
                  </p>

                  <p className="text-sm text-slate-500">
                    Vollständig
                  </p>
                </div>

              </div>

            </div>



            <div className="rounded-xl bg-slate-50 p-4">

              <div className="flex items-center gap-3">

                <ShieldCheck
                  size={20}
                  className="text-teal-600"
                />

                <div>
                  <p className="font-medium text-slate-900">
                    Einkommensnachweis
                  </p>

                  <p className="text-sm text-slate-500">
                    Bereit für Bewerbungen
                  </p>
                </div>

              </div>

            </div>



            <div className="rounded-xl bg-teal-50 p-4">

              <p className="font-semibold text-teal-700">
                ✓ Bewerbungsmappe vollständig
              </p>

            </div>


          </div>


        </motion.div>


      </div>

    </section>
  );
}


