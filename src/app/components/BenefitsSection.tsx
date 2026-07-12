"use client";

const benefits = [
  {
    title: "Keine Bewerbungen mehr selbst schreiben",
    text: "MietGate übernimmt den Bewerbungsprozess für dich."
  },
  {
    title: "Professionell vorbereitet",
    text: "Dein Bewerberprofil und deine Unterlagen sind strukturiert vorbereitet."
  },
  {
    title: "Mehr Zeit für dich",
    text: "Du sparst Zeit und konzentrierst dich auf dein neues Zuhause."
  }
];


export default function BenefitsSection() {

  return (

    <section className="bg-white px-6 py-24">

      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-900">
            Warum MietGate?
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Dein persönlicher Service für Mietbewerbungen.
          </p>

        </div>


        <div className="mt-12 grid gap-6 md:grid-cols-3">


          {benefits.map((item,index)=>(

            <div
              key={index}
              className="rounded-3xl bg-slate-50 p-8 transition hover:-translate-y-1 hover:shadow-lg"
            >

              <h3 className="text-xl font-bold text-slate-900">
                {item.title}
              </h3>


              <p className="mt-4 text-slate-600">
                {item.text}
              </p>

            </div>

          ))}


        </div>

      </div>

    </section>

  );

}

