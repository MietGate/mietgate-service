"use client";

import { use, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

import DashboardShell from "@/components/layout/DashboardShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

import {
  MapPin,
  CalendarDays,
  Clock,
  CheckCircle2,
  MessageCircle,
  Phone,
} from "lucide-react";


const STATUS_STEPS = [
  "Vorbereitung",
  "Beworben",
  "Antwort erhalten",
  "Besichtigung",
  "Zusage",
];


export default function ApplicationDetail({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {


  const { id } = use(params);


  const [application, setApplication] =
    useState<any>(null);



  useEffect(() => {

    loadApplication();

  }, []);




  async function loadApplication() {


    const supabase = createClient();



    const {
      data: {
        user,
      },
    } =
      await supabase.auth.getUser();



    if (!user) return;



    const {
      data,
      error,
    } =
      await supabase
        .from("applications")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();



    if (error) {

      console.error(error);
      return;

    }



    setApplication(data);


  }






  if (!application) {


    return (

      <DashboardShell>

        <div className="p-6">

          Bewerbung wird geladen...

        </div>

      </DashboardShell>

    );


  }





  const currentStatusIndex =
    STATUS_STEPS.indexOf(application.status);





  return (


    <DashboardShell>


      <div className="space-y-8">






        {/* HEADER */}


        <div>


          <h1 className="text-3xl font-bold text-slate-900">

            {application.apartment_title || "Wohnung"}

          </h1>



          <p className="mt-3 flex items-center gap-2 text-slate-500">

            <MapPin size={18}/>

            {application.address}

            {application.city &&
              `, ${application.city}`
            }

          </p>



          <div className="mt-4">

            <Badge>

              {application.status}

            </Badge>


          </div>


        </div>







        {/* WOHNUNGSDATEN */}



        <Card className="p-6">


          <h2 className="text-xl font-bold">

            Wohnungsdaten

          </h2>



          <div className="mt-5 space-y-3 text-slate-700">


            <p>

              🏠 {application.apartment_title}

            </p>



            <p>

              📍 {application.address}

            </p>



            <p>

              🏙 {application.city}

            </p>



            <p>

              📅 Bewerbung eingereicht:

              {" "}

              {
                new Date(
                  application.created_at
                ).toLocaleDateString(
                  "de-DE"
                )
              }

            </p>


          </div>


        </Card>









        {/* STATUS TIMELINE */}



        <Card className="p-6">


          <h2 className="text-xl font-bold">

            Bewerbungsstatus

          </h2>



          <div className="mt-8 space-y-6">


            {
              STATUS_STEPS.map(
                (step,index)=>{


                  const completed =
                    index <= currentStatusIndex;



                  return (

                    <div
                      key={step}
                      className="flex gap-4"
                    >


                      {
                        completed ?

                        <CheckCircle2
                          className="text-teal-600"
                        />

                        :

                        <Clock
                          className="text-slate-300"
                        />

                      }




                      <div>


                        <p
                          className={
                            completed
                            ?
                            "font-semibold text-slate-900"
                            :
                            "font-semibold text-slate-400"
                          }
                        >

                          {step}

                        </p>



                        <p className="text-sm text-slate-500">


                          {
                            step === "Vorbereitung" &&
                            "Deine Bewerbung wird vorbereitet."
                          }


                          {
                            step === "Beworben" &&
                            "MietGate hat deine Bewerbung übermittelt."
                          }


                          {
                            step === "Antwort erhalten" &&
                            "Der Vermieter hat eine Rückmeldung gegeben."
                          }


                          {
                            step === "Besichtigung" &&
                            "Ein Besichtigungstermin wurde vereinbart."
                          }


                          {
                            step === "Zusage" &&
                            "Die Wohnung wurde zugesagt."
                          }


                        </p>


                      </div>



                    </div>

                  );


                }
              )
            }


          </div>


        </Card>









        {/* NOTIZEN */}



        {
          application.notes &&

          <Card className="p-6">


            <h2 className="flex items-center gap-2 text-xl font-bold">

              <MessageCircle size={22}/>

              Nachricht von MietGate

            </h2>



            <p className="mt-4 text-slate-600">

              {application.notes}

            </p>


          </Card>

        }








        {/* BESICHTIGUNG */}



        <Card className="p-6">


          <h2 className="text-xl font-bold">

            Besichtigungstermin

          </h2>




          {
            application.viewing_date ?


            <div className="mt-5 space-y-3">


              <p className="flex items-center gap-2">

                <CalendarDays size={20}/>

                {application.viewing_date}

              </p>



              <p className="text-slate-500">

                Weitere Informationen folgen.

              </p>


            </div>


            :


            <p className="mt-4 text-slate-500">

              Noch kein Besichtigungstermin vereinbart.

            </p>


          }


        </Card>








        {/* KONTAKT */}



        <Card className="p-6">


          <h2 className="flex items-center gap-2 text-xl font-bold">

            <Phone size={22}/>

            Kontakt & nächste Schritte

          </h2>



          <p className="mt-4 text-slate-600">

            MietGate übernimmt die Kommunikation
            mit dem Vermieter.

          </p>



          <p className="mt-3 text-slate-600">

            Sobald es Neuigkeiten gibt,
            informieren wir dich direkt.

          </p>


        </Card>





      </div>


    </DashboardShell>


  );


}