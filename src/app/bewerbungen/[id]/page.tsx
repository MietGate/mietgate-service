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
  ExternalLink,
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
    id:string;
  }>;
}) {


  const { id } = use(params);


  const [application,setApplication] =
    useState<any>(null);


  const [viewing,setViewing] =
    useState<any>(null);



  useEffect(()=>{

    loadApplication();

  },[]);




  async function loadApplication(){

    const supabase = createClient();


    const {
      data:{
        user
      }
    } =
    await supabase.auth.getUser();



    if(!user) return;



    const {
      data:applicationData
    } =
    await supabase
      .from("applications")
      .select("*")
      .eq("id",id)
      .eq("user_id",user.id)
      .single();



    setApplication(applicationData);



    const {
      data:viewingData
    } =
    await supabase
      .from("viewings")
      .select("*")
      .eq(
        "application_id",
        id
      )
      .maybeSingle();



    setViewing(viewingData);

  }





  if(!application){

    return (

      <DashboardShell>

        <div className="p-6">
          Bewerbung wird geladen...
        </div>

      </DashboardShell>

    );

  }





  const currentStatusIndex =
    STATUS_STEPS.indexOf(
      application.status
    );





  return (

    <DashboardShell>

      <div className="space-y-8">



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





        <Card className="p-6">

          <h2 className="text-xl font-bold">
            Wohnungsdaten
          </h2>


          <div className="mt-5 space-y-3 text-slate-700">

            <p>
              {application.apartment_title}
            </p>


            <p>
              {application.address}
            </p>


            <p>
              {application.city}
            </p>



            {
              application.listing_url && (

                <a
                  href={application.listing_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    px-5
                    py-3
                    hover:bg-slate-50
                  "
                >

                  Inserat ansehen

                  <ExternalLink size={18}/>

                </a>

              )
            }


          </div>

        </Card>






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

                        <CheckCircle2 className="text-teal-600"/>

                        :

                        <Clock className="text-slate-300"/>

                      }


                      <p className={
                        completed
                        ?
                        "font-semibold"
                        :
                        "font-semibold text-slate-400"
                      }>
                        {step}
                      </p>


                    </div>

                  );

                }
              )
            }


          </div>


        </Card>






        {
          application.notes && (

            <Card className="p-6">

              <h2 className="flex items-center gap-2 text-xl font-bold">

                <MessageCircle size={22}/>

                Nachricht von MietGate

              </h2>


              <p className="mt-4 text-slate-600">

                {application.notes}

              </p>


            </Card>

          )
        }







        <Card className="p-6">


          <h2 className="text-xl font-bold">
            Besichtigungstermin
          </h2>



          {
            viewing ?

            <div className="mt-5 space-y-4">


              <p className="flex gap-2">

                <CalendarDays size={20}/>

                {viewing.viewing_date}

              </p>



              <p className="flex gap-2">

                <Clock size={20}/>

                {viewing.viewing_time}

              </p>




              <p className="flex gap-2 text-slate-600">

                <MapPin size={20}/>

                {viewing.address}, {viewing.city}

              </p>





              {
                viewing.listing_url && (

                  <a
                    href={viewing.listing_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-teal-600
                      px-5
                      py-3
                      text-white
                      hover:bg-teal-700
                    "
                  >

                    Inserat ansehen

                    <ExternalLink size={18}/>

                  </a>

                )
              }


            </div>


            :

            <p className="mt-4 text-slate-500">
              Noch kein Besichtigungstermin vereinbart.
            </p>

          }


        </Card>






        <Card className="p-6">


          <h2 className="flex items-center gap-2 text-xl font-bold">

            <Phone size={22}/>

            Kontakt & nächste Schritte

          </h2>



          <p className="mt-4 text-slate-600">

            MietGate übernimmt die Kommunikation mit dem Vermieter.

          </p>


          <p className="mt-3 text-slate-600">

            Sobald es Neuigkeiten gibt, informieren wir dich.

          </p>


        </Card>




      </div>


    </DashboardShell>

  );

}
