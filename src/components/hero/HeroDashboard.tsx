"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  FileText,
  CalendarDays,
} from "lucide-react";

export default function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="
        relative
        flex
        w-full
        max-w-[560px]
        min-w-0
        justify-center
      "
    >

      {/* Glow nur Desktop */}
      <div className="
        pointer-events-none
        absolute
        inset-0
        -z-10
        hidden
        rounded-[40px]
        bg-teal-200/40
        blur-3xl
        md:block
      " />


      {/* Dashboard */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          w-full
          max-w-full
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        "
      >

        <Image
          src="/hero-dashboard.png"
          alt="MietGate Dashboard"
          width={900}
          height={700}
          priority
          className="
            block
            h-auto
            w-full
            max-w-full
            object-contain
          "
        />

      </motion.div>



      {/* Dokumente */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, -6, 0],
        }}
        transition={{
          delay: 0.4,
          duration: 5,
          repeat: Infinity,
        }}
        className="
          absolute
          left-0
          top-10
          hidden
          rounded-2xl
          bg-white
          px-4
          py-3
          shadow-xl
          md:block
        "
      >
        <div className="flex items-center gap-3">
          <FileText
            className="text-teal-600"
            size={20}
          />

          <div>
            <p className="text-xs text-slate-500">
              Dokumente
            </p>

            <p className="font-semibold">
              Vollständig
            </p>
          </div>
        </div>
      </motion.div>



      {/* Bewerbungen */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, 8, 0],
        }}
        transition={{
          delay: 0.8,
          duration: 5,
          repeat: Infinity,
        }}
        className="
          absolute
          right-0
          top-1/3
          hidden
          rounded-2xl
          bg-white
          px-4
          py-3
          shadow-xl
          md:block
        "
      >
        <div className="flex items-center gap-3">
          <CheckCircle2
            className="text-green-500"
            size={20}
          />

          <div>
            <p className="text-xs text-slate-500">
              Bewerbungen
            </p>

            <p className="font-semibold">
              12 aktiv
            </p>
          </div>
        </div>
      </motion.div>



      {/* Termin */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, -7, 0],
        }}
        transition={{
          delay: 1.2,
          duration: 5,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-8
          left-8
          hidden
          rounded-2xl
          bg-white
          px-4
          py-3
          shadow-xl
          md:block
        "
      >
        <div className="flex items-center gap-3">
          <CalendarDays
            className="text-teal-600"
            size={20}
          />

          <div>
            <p className="text-xs text-slate-500">
              Nächster Termin
            </p>

            <p className="font-semibold">
              Freitag · 16:30 Uhr
            </p>
          </div>
        </div>
      </motion.div>


    </motion.div>
  );
}



