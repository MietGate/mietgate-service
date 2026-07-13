"use client";

import { motion } from "framer-motion";
import HeroContent from "@/components/hero/HeroContent";
import HeroDashboard from "@/components/hero/HeroDashboard";

export default function Hero() {
  return (
    <section className="relative w-full max-w-full overflow-hidden bg-white">

      {/* Hintergrund */}
      <div className="absolute inset-0 -z-20 bg-white" />

      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-teal-100 blur-3xl opacity-60 -z-10" />

      <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-cyan-100 blur-3xl opacity-50 -z-10" />

      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-50 blur-3xl opacity-70 -z-10" />


    <div className="mx-auto grid w-full max-w-7xl min-w-0 overflow-hidden items-center gap-16 px-4 py-10 md:px-6 md:py-24 lg:grid-cols-2">

        {/* Linke Seite */}
        <HeroContent />


        {/* Rechte Seite */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="order-last w-full lg:order-last"
        >
          <HeroDashboard />
        </motion.div>


      </div>

    </section>
  );
}