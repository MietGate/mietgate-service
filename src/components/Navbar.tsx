"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="relative z-50 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 font-bold text-white">
            M
          </div>

          <span className="text-xl font-bold text-slate-900">
            Miet<span className="text-teal-600">Gate</span>
          </span>
        </Link>


        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          <Link
            href="#funktionen"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Funktionen
          </Link>

          <Link
            href="#preise"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Preise
          </Link>

          <Link
            href="#faq"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            FAQ
          </Link>

        </nav>


        {/* Aktionen Desktop */}
        <div className="hidden items-center gap-4 md:flex">

          <button className="text-sm font-semibold text-slate-700">
            Login
          </button>

          <button
            className="
            rounded-xl
            bg-teal-600
            px-5
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


        {/* Mobile Menü */}
        <button className="md:hidden">
          <Menu size={26} />
        </button>


      </div>
    </header>
  );
}