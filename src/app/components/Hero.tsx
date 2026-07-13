"use client";

import { motion } from "framer-motion";
import HeroContent from "@/components/hero/HeroContent";
import HeroDashboard from "@/components/hero/HeroDashboard";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">

      {/* Hintergrund */}
      <div className="absolute inset-0 -z-20 bg-white" />

      {/* Dekorative Blurs - Mobile sicher */}
      <div className="pointer-events-none absolute -left-40 top-20 hidden h-96 w-96 rounded-full bg-teal-100 opacity-60 blur-3xl md:block" />

      <div className="pointer-events-none absolute right-[-150px] top-0 hidden h-[420px] w-[420px] rounded-full bg-cyan-100 opacity-50 blur-3xl md:block" />

      <div className="pointer-events-none absolute bottom-0 left-1/2 hidden h-72 w-72 -translate-x-1/2 rounded-full bg-teal-50 opacity-70 blur-3xl md:block" />


      <div
        className="
          mx-auto
          grid
          w-full
          max-w-7xl
          min-w-0
          items-center
          gap-12
          overflow-hidden
          px-4
          py-10
          sm:px-6
          md:gap-16
          md:py-24
          lg:grid-cols-2
        "
      >

        {/* Linke Seite */}
        <div className="min-w-0">
          <HeroContent />
        </div>


        {/* Rechte Seite */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            order-last
            flex
            w-full
            min-w-0
            justify-center
            lg:order-last
          "
        >
          <HeroDashboard />
        </motion.div>


      </div>

    </section>
  );
}