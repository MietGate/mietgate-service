"use client";

import { motion } from "framer-motion";
import {
  Send,
  Sparkles,
  Clock3,
  TrendingUp,
} from "lucide-react";

const benefits = [
  {
    icon: Send,
    title: "Professionelle Bewerbungen versenden",
    text: "MietGate unterstützt dich dabei, schnell und professionell auf passende Wohnungen zu reagieren.",
  },
  {
    icon: Sparkles,
    title: "Starker erster Eindruck",
    text: "Dein Bewerberprofil und deine Unterlagen werden strukturiert und professionell vorbereitet.",
  },
  {
    icon: TrendingUp,
    title: "Mehr Chancen auf Besichtigungen",
    text: "Mit einem optimierten Bewerbungsprozess erhöhst du deine Chancen bei Vermietern.",
  },
  {
    icon: Clock3,
    title: "Weniger Aufwand für dich",
    text: "Keine ständigen Formulare, keine verlorenen Unterlagen und weniger Bewerbungsstress.",
  },
];


export default function BenefitsSection() {

  return (

    <section className="bg-white px-6 py-24">

      <div className="mx-auto max-w-7xl">


        {/* Überschrift */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-3xl text-center"
        >

          <p className="text-sm font-semibold text-teal-600">
            Deine Vorteile
          </p>


          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Warum MietGate?
          </h2>


          <p className="mt-5 text-lg text-slate-600">
            Dein persönlicher Bewerbungsservice für die Wohnungssuche.
            Wir übernehmen den Aufwand, damit du dich auf dein neues Zuhause konzentrieren kannst.
          </p>


        </motion.div>



        {/* Karten */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">


          {benefits.map((benefit, index) => {

            const Icon = benefit.icon;


            return (

              <motion.div

                key={benefit.title}

                initial={{
                  opacity: 0,
                  y: 30,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                viewport={{
                  once: true,
                }}

                transition={{
                  delay: index * 0.1,
                }}

                className="
                  rounded-3xl
                  bg-slate-50
                  p-6
                  transition
                  hover:-translate-y-2
                  hover:shadow-lg
                "
              >


                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-teal-50
                  "
                >

                  <Icon
                    size={24}
                    className="text-teal-600"
                  />

                </div>


                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {benefit.title}
                </h3>


                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {benefit.text}
                </p>


              </motion.div>

            );

          })}


        </div>


      </div>


    </section>

  );

}


