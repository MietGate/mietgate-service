"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";


export default function Navbar() {

  const [open, setOpen] = useState(false);


  return (

    <header className="relative z-50 bg-white">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">


        <Link
          href="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
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




        <div className="hidden items-center gap-5 md:flex">


          <Link
            href="/login"
            className="
              text-sm
              font-semibold
              text-slate-700
              transition
              hover:text-teal-600
            "
          >
            Login
          </Link>



          <Link
            href="/start"
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
          </Link>


        </div>





        <button
          className="md:hidden"
          aria-label="Menü öffnen"
          onClick={() => setOpen(!open)}
        >

          {open ? (

            <X
              size={28}
              className="text-slate-700"
            />

          ) : (

            <Menu
              size={28}
              className="text-slate-700"
            />

          )}

        </button>



      </div>





      {open && (

        <div className="
          absolute
          left-0
          right-0
          top-full
          border-t
          bg-white
          px-6
          py-8
          shadow-lg
          md:hidden
        ">


          <div className="flex flex-col gap-6">


            <Link
              href="#funktionen"
              onClick={() => setOpen(false)}
              className="font-medium text-slate-700"
            >
              Funktionen
            </Link>



            <Link
              href="#preise"
              onClick={() => setOpen(false)}
              className="font-medium text-slate-700"
            >
              Preise
            </Link>



            <Link
              href="#faq"
              onClick={() => setOpen(false)}
              className="font-medium text-slate-700"
            >
              FAQ
            </Link>



            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="font-semibold text-slate-700"
            >
              Login
            </Link>



            <Link
              href="/start"
              onClick={() => setOpen(false)}
              className="
                rounded-xl
                bg-teal-600
                px-6
                py-3
                text-center
                font-semibold
                text-white
              "
            >
              Kostenlos starten
            </Link>



          </div>


        </div>

      )}


    </header>

  );

}
