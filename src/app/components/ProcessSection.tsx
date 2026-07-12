"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProcessSection() {
  return (
    <section className="bg-slate-50 px-6 py-24">

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

        <motion.div
          initial={{opacity:0,x:-30}}
          whileInView={{opacity:1,x:0}}
          viewport={{once:true}}
        >

          <h2 className="text-4xl font-bold text-slate-900">
            Von deinem Suchprofil
            <br />
            bis zur Besichtigung.
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Du legst einmal deine Wünsche fest.
            MietGate übernimmt die nächsten Schritte.
          </p>

          <div className="mt-8 space-y-5">

            <div>
              <h3 className="font-semibold text-slate-900">
                1. Suchprofil erstellen
              </h3>
              <p className="text-slate-600">
                Teile uns mit, welche Wohnung du suchst.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                2. Bewerbungsprozess übernehmen lassen
              </h3>
              <p className="text-slate-600">
                MietGate unterstützt dich bei passenden Bewerbungen.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                3. Besichtigungen erhalten
              </h3>
              <p className="text-slate-600">
                Du konzentrierst dich auf dein neues Zuhause.
              </p>
            </div>

          </div>

        </motion.div>


        <motion.div
          initial={{opacity:0,scale:0.95}}
          whileInView={{opacity:1,scale:1}}
          viewport={{once:true}}
        >

          <Image
            src="/process-mietgate.jpg"
            alt="MietGate Prozess Wohnungssuche"
            width={800}
            height={600}
            className="rounded-3xl shadow-xl"
          />

        </motion.div>

      </div>

    </section>
  );
}

