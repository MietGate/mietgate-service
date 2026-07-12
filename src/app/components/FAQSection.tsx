"use client";

import { useState } from "react";

const questions = [
  {
    q: "Was macht MietGate genau?",
    a: "Du erstellst dein Suchprofil und wir übernehmen den Bewerbungsprozess für dich."
  },
  {
    q: "Muss ich mich noch selbst auf Wohnungen bewerben?",
    a: "Nein. MietGate übernimmt die Bewerbungen für dich."
  },
  {
    q: "Kann MietGate eine Wohnung garantieren?",
    a: "Wir garantieren Besichtigungstermine bei passenden verfügbaren Wohnungen gemäß deinem Suchprofil."
  },
  {
    q: "Welche Dokumente kann ich hinterlegen?",
    a: "Zum Beispiel Selbstauskunft, Einkommensnachweise oder weitere Unterlagen."
  },
  {
    q: "Wie funktioniert die Kündigung?",
    a: "MietGate kann jederzeit gekündigt werden."
  },
  {
    q: "Was ist der Unterschied zwischen Basic und Premium?",
    a: "Premium bietet mehr Betreuung, höhere Priorität, Hotline und mehr garantierte Besichtigungstermine."
  }
];


export default function FAQSection() {

  const [open, setOpen] = useState<number | null>(null);


  return (
    <section className="px-6 py-24">

      <div className="mx-auto max-w-4xl">

        <h2 className="text-center text-4xl font-bold text-slate-900">
          Häufige Fragen
        </h2>


        <div className="mt-10 space-y-4">

          {questions.map((item,index)=>(
            
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white"
            >

              <button
                onClick={()=>setOpen(open===index ? null : index)}
                className="flex w-full justify-between p-6 text-left font-semibold"
              >
                {item.q}

                <span>
                  {open===index ? "-" : "+"}
                </span>

              </button>


              {open===index && (

                <div className="px-6 pb-6 text-slate-600">
                  {item.a}
                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

