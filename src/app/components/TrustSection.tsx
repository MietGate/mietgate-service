"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Clock3,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const items = [
  {
    icon: FileText,
    title: "Alle Unterlagen an einem Ort",
    text: "Verwalte deine Dokumente, Nachweise und Bewerbungen übersichtlich.",
  },
  {
    icon: Clock3,
    title: "Zeit sparen",
    text: "Keine manuellen Bewerbungen mehr. MietGate unterstützt dich bei jedem Schritt.",
  },
  {
    icon: TrendingUp,
    title: "Mehr Chancen",
    text: "Professionelle Bewerbungen erhöhen deine Chancen auf Besichtigungen.",
  },
  {
    icon: ShieldCheck,
    title: "Sicher & DSGVO-konform",
    text: "Deine persönlichen Daten bleiben geschützt und kontrolliert.",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-slate-50 py-20">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto max-w-3xl text-center"
        >

          <p className="text-sm font-semibold text-teal-600">
            Warum MietGate?
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Mietbewerbungen endlich einfach verwalten
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Schluss mit Papierchaos, verstreuten Dokumenten und unübersichtlichen Bewerbungen.
          </p>

        </motion.div>


        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {items.map((item, index) => {

            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                className="
                  rounded-3xl
                  bg-white
                  p-6
                  shadow-sm
                  transition
                  hover:shadow-lg
                "
              >

                <div className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-teal-50
                ">
                  <Icon
                    className="text-teal-600"
                    size={24}
                  />
                </div>


                <h3 className="mt-5 font-semibold text-slate-900">
                  {item.title}
                </h3>


                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>


              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}