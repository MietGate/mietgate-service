"use client";


type Props = {
  applications:any[];
};


const statuses = [
  "Vorbereitung",
  "Beworben",
  "Antwort erhalten",
  "Besichtigung",
  "Zusage",
  "Absage",
];



export default function ApplicationStats({
  applications
}:Props){


  function count(status:string){

    return applications.filter(
      app =>
        app.status === status
    ).length;

  }



  const cards = [

    {
      title:"Gesamt",
      value:applications.length
    },

    ...statuses.map(status=>({

      title:status,

      value:count(status)

    }))

  ];




  return (

    <div
      className="
        grid
        gap-4
        md:grid-cols-2
        xl:grid-cols-7
        mb-8
      "
    >

      {
        cards.map(card=>(

          <div
            key={card.title}
            className="
              rounded-3xl
              bg-white
              p-5
              shadow-sm
              border
            "
          >

            <p className="
              text-sm
              text-slate-500
            ">
              {card.title}
            </p>


            <p className="
              mt-2
              text-3xl
              font-bold
              text-slate-900
            ">
              {card.value}
            </p>


          </div>

        ))
      }


    </div>

  );

}


