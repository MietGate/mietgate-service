"use client";

export default function PricingSection() {
  return (
    <section className="bg-slate-50 px-6 py-24">

      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-900">
            Wähle deinen MietGate Service
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Wir übernehmen deine Mietbewerbungen.
            Du konzentrierst dich auf deine neue Wohnung.
          </p>

        </div>


        <div className="mt-12 grid gap-8 lg:grid-cols-2">


          <div className="rounded-3xl bg-white p-8 shadow-lg">

            <h3 className="text-2xl font-bold text-slate-900">
              MietGate Basic
            </h3>

            <p className="mt-3 text-slate-600">
              Für Bewerber, die Zeit sparen möchten.
            </p>


            <div className="mt-6 text-4xl font-bold">
              29€
              <span className="text-lg font-normal text-slate-500">
                /Monat
              </span>
            </div>


            <div className="mt-8 space-y-4 text-slate-700">

              <p>? Persönliches Suchprofil</p>
              <p>? Bewerberprofil erstellen</p>
              <p>? Dokumente optional hinterlegen</p>
              <p>? MietGate übernimmt Bewerbungen</p>
              <p>? Keine eigenen Bewerbungen schreiben</p>
              <p>? 3 Besichtigungstermine garantiert</p>
              <p>? Jederzeit kündbar</p>

            </div>


            <button className="mt-8 w-full rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white">
              Basic starten
            </button>


          </div>



          <div className="rounded-3xl border-2 border-teal-500 bg-white p-8 shadow-xl">

            <div className="mb-4 inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-700">
              Empfohlen
            </div>


            <h3 className="text-2xl font-bold text-slate-900">
              MietGate Premium
            </h3>


            <p className="mt-3 text-slate-600">
              Für Bewerber, die maximale Unterstützung möchten.
            </p>


            <div className="mt-6 text-4xl font-bold">
              49€
              <span className="text-lg font-normal text-slate-500">
                /Monat
              </span>
            </div>


            <div className="mt-8 space-y-4 text-slate-700">

              <p>? Alles aus Basic</p>
              <p>? Höhere Priorität</p>
              <p>? Schnellere Bearbeitung</p>
              <p>? Persönlicher Ansprechpartner</p>
              <p>? Kostenlose MietGate Hotline</p>
              <p>? 5 Besichtigungstermine garantiert</p>
              <p>? Jederzeit kündbar</p>

            </div>


            <button className="mt-8 w-full rounded-xl bg-teal-500 px-6 py-3 font-semibold text-white hover:bg-teal-600">
              Premium starten
            </button>


          </div>


        </div>

      </div>

    </section>
  );
}

