"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="relative z-50 bg-white">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">


        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
        >

         <Image
  src="/logo-transparent.png"
  alt="MietGate Logo"
  width={220}
  height={70}
  priority
  className="h-14 w-auto object-contain"
/>

        </Link>



        {/* Navigation */}
        <nav className="hidden items-center gap-10 md:flex">

          <Link
            href="#funktionen"
            className="text-sm font-medium text-slate-600 transition hover:text-teal-600"
          >
            Funktionen
          </Link>

          <Link
            href="#preise"
            className="text-sm font-medium text-slate-600 transition hover:text-teal-600"
          >
            Preise
          </Link>

          <Link
            href="#faq"
            className="text-sm font-medium text-slate-600 transition hover:text-teal-600"
          >
            FAQ
          </Link>

        </nav>



        {/* Buttons */}
        <div className="hidden items-center gap-5 md:flex">

          <button className="text-sm font-semibold text-slate-700">
            Login
          </button>


          <button
            className="
              rounded-xl
              bg-teal-600
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-teal-700
            "
          >
            Kostenlos starten
          </button>

        </div>



        {/* Mobile */}
        <button className="md:hidden">
          <Menu
            size={28}
            className="text-slate-700"
          />
        </button>


      </div>

    </header>
  );
}