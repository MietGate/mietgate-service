"use client";

import { motion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  Crown,
} from "lucide-react";


const plans = [
  {
    name: "MietGate Basic",
    description:
      "Für Bewerber, die Zeit sparen und professioneller auftreten möchten.",
    price: "29€",
    guarantee:
      "Mindestens 3 Besichtigungstermine garantiert",
    features: [
      "Persönliches Suchprofil",
      "Professionelles Bewerberprofil",
      "Dokumente zentral verwalten",
      "MietGate übernimmt deine Bewerbungen",
      "Keine eigenen Bewerbungen schreiben",
      "Geld-zurück-Garantie",
      "Jederzeit kündbar",
    ],
    button:
      "Basic starten",
    popular: false,
  },
  {
    name: "MietGate Premium",
    description:
      "Für Bewerber, die maximale Unterstützung bei der Wohnungssuche möchten.",
    price: "49€",
    guarantee:
      "Mindestens 5 Besichtigungstermine garantiert",
    features: [
      "Alles aus Basic",
      "Priorisierte Bearbeitung",
      "Schnellere Unterstützung",
      "Persönlicher Ansprechpartner",
      "Erweiterte Bewerbungsoptimierung",
      "Geld-zurück-Garantie",
      "Jederzeit kündbar",
    ],
    button:
      "Premium starten",
    popular: true,
  },
];


export default function PricingSection() {

  return (

    <section className="bg-slate-50 px-6 py-24">

      <div className="mx-auto max-w-7xl">


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
          className="mx-auto max-w-3xl text-center"
        >

          <p className="text-sm font-semibold text-teal-600">
            Preise
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
            Wähle deinen MietGate Service
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Wir übernehmen deine Mietbewerbungen,
            damit du dich auf dein neues Zuhause konzentrieren kannst.
          </p>

        </motion.div>



        <div className="mt-14 grid gap-8 lg:grid-cols-2">


          {plans.map((plan,index)=>(

            <motion.div
              key={plan.name}

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
                delay:index * 0.15,
              }}

              className={`
                rounded-3xl
                bg-white
                p-8
                shadow-xl
                ${
                  plan.popular
                  ? "border-2 border-teal-500"
                  : "border border-slate-200"
                }
              `}
            >


              {plan.popular && (

                <div className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-teal-100
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-teal-700
                ">

                  <Crown size={16}/>
                  Empfohlen

                </div>

              )}



              <h3 className="text-2xl font-bold text-slate-900">
                {plan.name}
              </h3>


              <p className="mt-3 text-slate-600">
                {plan.description}
              </p>



              <div className="mt-6 text-5xl font-bold text-slate-900">

                {plan.price}

                <span className="text-lg font-normal text-slate-500">
                  /Monat
                </span>

              </div>



              {/* Garantie */}
              <div className="
                mt-6
                flex
                items-center
                gap-3
                rounded-2xl
                bg-teal-50
                p-4
              ">

                <ShieldCheck
                  className="text-teal-600"
                  size={26}
                />

                <span className="font-semibold text-teal-700">
                  {plan.guarantee}
                </span>

              </div>



              <div className="mt-8 space-y-4">

                {plan.features.map((feature)=>(

                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >

                    <Check
                      size={20}
                      className="text-teal-600"
                    />

                    <span className="text-slate-700">
                      {feature}
                    </span>

                  </div>

                ))}

              </div>



              <button
                className={`
                  mt-8
                  w-full
                  rounded-xl
                  px-6
                  py-4
                  font-semibold
                  transition

                  ${
                    plan.popular
                    ?
                    "bg-teal-600 text-white hover:bg-teal-700"
                    :
                    "bg-slate-900 text-white hover:bg-slate-800"
                  }
                `}
              >

                {plan.button}

              </button>


            </motion.div>

          ))}


        </div>


      </div>


    </section>

  );
}