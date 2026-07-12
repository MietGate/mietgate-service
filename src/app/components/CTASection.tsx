"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="px-6 py-24">
      <motion.div
        initial={{opacity:0,y:30}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        className="mx-auto max-w-5xl rounded-3xl bg-slate-900 px-8 py-16 text-center text-white"
      >
        <h2 className="text-4xl font-bold">
          Bereit für eine einfachere Wohnungssuche?
        </h2>

        <p className="mt-5 text-slate-300">
          Erstelle dein Suchprofil und überlasse MietGate den Prozess.
        </p>

        <button className="mt-8 rounded-xl bg-teal-500 px-8 py-3 font-semibold">
          Jetzt starten
        </button>

      </motion.div>
    </section>
  );
}

