"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";


const questions = [
  {
    q: "Was macht MietGate genau?",
    a: "Du erstellst einmal dein persönliches Suchprofil. Anschließend unterstützt dich MietGate bei deinen Mietbewerbungen und hilft dir dabei, professionell bei passenden Wohnungen aufzutreten.",
  },
  {
    q: "Muss ich mich noch selbst auf Wohnungen bewerben?",
    a: "Nein. MietGate übernimmt den Bewerbungsprozess für dich, damit du keine Zeit mehr mit einzelnen Bewerbungen und wiederholten Formularen verlieren musst.",
  },
  {
    q: "Wie funktioniert die Besichtigungsgarantie?",
    a: "Je nach Paket garantieren wir mindestens 3 Besichtigungstermine im Basic-Tarif oder mindestens 5 Besichtigungstermine im Premium-Tarif. Sollte die Garantie nicht erreicht werden, greift unsere Geld-zurück-Garantie.",
  },
  {
    q: "Gibt es Voraussetzungen für die Garantie?",
    a: "Die Garantie gilt bei einem vollständigen Suchprofil, passenden Suchkriterien und einer aktiven Wohnungssuche. Details zu den Bedingungen findest du in unseren Servicebedingungen.",
  },
  {
    q: "Welche Dokumente kann ich hinterlegen?",
    a: "Du kannst wichtige Unterlagen wie Mieterselbstauskunft, Einkommensnachweise oder weitere Bewerbungsdokumente zentral vorbereiten und verwalten.",
  },
  {
    q: "Kann ich jederzeit kündigen?",
    a: "Ja. MietGate kann jederzeit gekündigt werden. Es gibt keine langfristige Bindung.",
  },
  {
    q: "Was ist der Unterschied zwischen Basic und Premium?",
    a: "Premium bietet dir zusätzliche Betreuung, priorisierte Unterstützung, einen persönlichen Ansprechpartner und eine höhere Besichtigungsgarantie.",
  },
];


export default function FAQSection() {

  const [open, setOpen] = useState<number | null>(null);


  return (

    <section
      id="faq"
      className="bg-white px-6 py-24"
    >

      <div className="mx-auto max-w-4xl">


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
          className="text-center"
        >

          <p className="text-sm font-semibold text-teal-600">
            FAQ
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
            Häufige Fragen
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Alles Wichtige über MietGate und unsere Erfolgsgarantie.
          </p>

        </motion.div>



        <div className="mt-12 space-y-4">


          {questions.map((item,index)=>(

            <motion.div
              key={index}

              initial={{
                opacity:0,
                y:20,
              }}

              whileInView={{
                opacity:1,
                y:0,
              }}

              viewport={{
                once:true,
              }}

              transition={{
                delay:index * 0.05,
              }}

              className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
              "
            >


              <button

                onClick={() =>
                  setOpen(open === index ? null : index)
                }

                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  p-6
                  text-left
                  font-semibold
                  text-slate-900
                "

              >

                {item.q}


                <ChevronDown
                  size={22}
                  className={`
                    transition-transform
                    ${
                      open === index
                      ? "rotate-180 text-teal-600"
                      : "text-slate-500"
                    }
                  `}
                />

              </button>



              {open === index && (

                <div
                  className="
                    border-t
                    border-slate-100
                    px-6
                    pb-6
                    pt-5
                    leading-7
                    text-slate-600
                  "
                >

                  {item.a}

                </div>

              )}


            </motion.div>

          ))}


        </div>


      </div>


    </section>

  );
}


