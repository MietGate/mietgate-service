"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProcessSection() {
  return (
    <section
  id="prozess"
  className="bg-white px-6 py-24"
>

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

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
            So funktioniert MietGate
          </p>


          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Von der Suche
            <br />
            bis zur Besichtigung.
          </h2>


          <p className="mt-5 text-lg text-slate-600">
            Du definierst deine Wünsche.
            MietGate übernimmt den Bewerbungsprozess und hilft dir,
            schneller passende Wohnungen zu erreichen.
          </p>


          <div className="mt-8 space-y-6">


            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                1. Suchprofil erstellen
              </h3>

              <p className="mt-2 text-slate-600">
                Teile uns mit, welche Wohnung du suchst.
                Wir kennen deine Wünsche und Anforderungen.
              </p>
            </div>


            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                2. Professionelle Bewerbungen versenden
              </h3>

              <p className="mt-2 text-slate-600">
                MietGate erstellt professionelle Bewerbungen und unterstützt
                dich dabei, schnell auf passende Wohnungen zu reagieren.
              </p>
            </div>


            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                3. Besichtigungstermine erhalten
              </h3>

              <p className="mt-2 text-slate-600">
                Lehne dich zurück und konzentriere dich auf die Wohnungen,
                die wirklich zu dir passen.
              </p>
            </div>


          </div>

        </motion.div>


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