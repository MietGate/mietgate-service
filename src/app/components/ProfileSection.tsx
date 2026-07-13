"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  CheckCircle2,
} from "lucide-react";

const features = [
  "Wunschwohnung und Suchkriterien hinterlegt",
  "Pers�nliche Daten zentral verwaltet",
  "Unterlagen f�r Bewerbungen vorbereitet",
  "Bereit f�r professionelle Bewerbungen",
];

export default function ProfileSection() {
  return (
    <section className="bg-slate-50 px-6 py-24">

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">


        {/* Bild */}`r`n        <motion.div className="order-2 lg:order-1"
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

          <Image
            src="/profile-mietgate.jpg"
            alt="MietGate Bewerberprofil"
            width={800}
            height={600}
            className="rounded-3xl shadow-xl"
          />

        </motion.div>



        {/* Text */}`r`n        <motion.div className="order-1 lg:order-2"
          initial={{
            opacity: 0,
            x: 30,
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
            Dein Bewerberprofil
          </p>


          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Ein Profil.
            <br />
            Professionelle Bewerbungen.
          </h2>


          <p className="mt-6 text-lg text-slate-600">
            Hinterlege deine wichtigsten Informationen einmalig.
            MietGate nutzt dein Profil, um Bewerbungen professionell vorzubereiten.
          </p>



          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">


            <p className="text-sm font-semibold text-slate-500">
              Dein MietGate Profil
            </p>


            <div className="mt-5 space-y-4">

              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >

                  <CheckCircle2
                    size={22}
                    className="text-teal-600"
                  />

                  <span className="text-slate-700">
                    {feature}
                  </span>

                </div>
              ))}

            </div>


          </div>


        </motion.div>


      </div>

    </section>
  );
}

