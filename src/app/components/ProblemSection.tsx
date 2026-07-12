"use client";

import { motion } from "framer-motion";

const problems = [
  {
    icon: "ðŸ ",
    title: "Zu viele Bewerber",
    text: "Gute Mietwohnungen erhalten oft zahlreiche Anfragen. Ohne einen strukturierten Prozess wird man schnell Ã¼bersehen.",
  },
  {
    icon: "â°",
    title: "Zeitaufwand",
    text: "Wohnungssuche, Bewerbungen und Kommunikation kosten viele Stunden und Nerven.",
  },
  {
    icon: "ðŸ“„",
    title: "Komplexe Bewerbung",
    text: "Unterlagen, Profil und Kommunikation mÃ¼ssen professionell vorbereitet sein.",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-slate-50 px-6 py-24">

      <div className="mx-auto max-w-7xl">

        {/* Ãœberschrift */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">
            Eine Wohnung zu finden
            <br />
            ist heute ein Vollzeitjob.
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Gute Wohnungen sind schnell vergeben.
            Bewerber mÃ¼ssen reagieren, Ã¼berzeugen und den Ãœberblick behalten.
          </p>
        </motion.div>


        {/* Karten */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">

          {problems.map((problem, index) => (

            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              className="
                rounded-3xl
                bg-white
                p-8
                shadow-sm
                transition
                hover:-translate-y-2
                hover:shadow-xl
              "
            >

              <div className="text-4xl">
                {problem.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                {problem.title}
              </h3>

              <p className="mt-3 leading-relaxed text-slate-600">
                {problem.text}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

