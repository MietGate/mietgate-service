import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { getAdminStats } from "@/services/admin/dashboard";

import {
  Users,
  FileText,
  CalendarCheck,
  AlertCircle,
  UserRound,
  ClipboardList,
  Settings,
  Kanban,
} from "lucide-react";


export default async function AdminDashboardPage() {


  const dashboard = await getAdminStats();



  const pipelineItems = [
    {
      name:"Vorbereitung",
      value:dashboard.pipeline.Vorbereitung
    },
    {
      name:"Beworben",
      value:dashboard.pipeline.Beworben
    },
    {
      name:"Antwort erhalten",
      value:dashboard.pipeline["Antwort erhalten"]
    },
    {
      name:"Besichtigung",
      value:dashboard.pipeline.Besichtigung
    },
    {
      name:"Zusage",
      value:dashboard.pipeline.Zusage
    },
    {
      name:"Absage",
      value:dashboard.pipeline.Absage
    }
  ];



  return (

    <main className="min-h-screen bg-slate-50 p-8">

      <div className="mx-auto max-w-7xl">


        <h1 className="text-3xl font-bold text-slate-900">
          Admin Dashboard
        </h1>


        <p className="mt-2 text-slate-600">
          Übersicht über MietGate Kunden, Bewerbungen und Aufgaben
        </p>





        <div className="mt-8 grid gap-4 md:grid-cols-5">


          <a
            href="/admin/kunden"
            className="rounded-2xl border bg-white p-5 hover:shadow"
          >
            <UserRound className="text-teal-600"/>

            <p className="mt-3 font-semibold">
              Kunden
            </p>

          </a>




          <a
            href="/admin/bewerbungen"
            className="rounded-2xl border bg-white p-5 hover:shadow"
          >

            <ClipboardList className="text-teal-600"/>

            <p className="mt-3 font-semibold">
              Bewerbungen
            </p>

          </a>





          <a
            href="/admin/bewerbungen/kanban"
            className="rounded-2xl border bg-white p-5 hover:shadow"
          >

            <Kanban className="text-teal-600"/>

            <p className="mt-3 font-semibold">
              Bewerbungs-Pipeline
            </p>

          </a>





          <a
            href="/admin/besichtigungen"
            className="rounded-2xl border bg-white p-5 hover:shadow"
          >

            <CalendarCheck className="text-teal-600"/>

            <p className="mt-3 font-semibold">
              Besichtigungen
            </p>

          </a>





          <a
            href="/admin/einstellungen"
            className="rounded-2xl border bg-white p-5 hover:shadow"
          >

            <Settings className="text-teal-600"/>

            <p className="mt-3 font-semibold">
              Einstellungen
            </p>

          </a>


        </div>





        <div className="mt-8 grid gap-6 md:grid-cols-4">


          <Card>

            <Users className="text-teal-600"/>

            <p className="mt-3 font-semibold">
              Kunden
            </p>

            <p className="text-3xl font-bold">
              {dashboard.customers}
            </p>

          </Card>





          <Card>

            <FileText className="text-teal-600"/>

            <p className="mt-3 font-semibold">
              Bewerbungen
            </p>

            <p className="text-3xl font-bold">
              {dashboard.applications}
            </p>

          </Card>





          <Card>

            <CalendarCheck className="text-teal-600"/>

            <p className="mt-3 font-semibold">
              Besichtigungen
            </p>

            <p className="text-3xl font-bold">
              {dashboard.viewings}
            </p>

          </Card>





          <Card>

            <AlertCircle className="text-red-600"/>

            <p className="mt-3 font-semibold">
              Aktionen
            </p>

            <p className="text-3xl font-bold text-red-600">
              {dashboard.alerts}
            </p>

          </Card>


        </div>





        <Card className="mt-8">


          <h2 className="text-xl font-bold">
            Bewerbungs-Pipeline
          </h2>


          <div className="mt-6 grid gap-4 md:grid-cols-6">


            {
              pipelineItems.map(item=>(

                <div
                  key={item.name}
                  className="rounded-2xl bg-slate-50 p-5 text-center"
                >

                  <p className="text-sm text-slate-500">
                    {item.name}
                  </p>


                  <p className="mt-2 text-3xl font-bold">
                    {item.value}
                  </p>


                </div>

              ))
            }


          </div>


        </Card>





        <Card className="mt-8">


          <h2 className="text-xl font-bold text-red-600">
            ⚠️ Aktionen erforderlich
          </h2>



          <div className="mt-5 space-y-4">


            {
              dashboard.declinedViewings.map((viewing:any)=>(
                
                <div
                  key={viewing.id}
                  className="rounded-xl border border-red-200 bg-red-50 p-5"
                >

                  <p className="font-bold">
                    {viewing.title}
                  </p>


                  <p>
                    Kunde:
                    {viewing.customer?.full_name || "-"}
                  </p>


                  <a
                    href={`/admin/kunden/${viewing.user_id}`}
                    className="mt-3 inline-block rounded-xl bg-white border px-4 py-2"
                  >
                    Kunden öffnen
                  </a>


                </div>

              ))
            }


            {
              dashboard.declinedViewings.length === 0 && (

                <p className="text-slate-500">
                  Keine offenen Aktionen
                </p>

              )
            }


          </div>


        </Card>





        <Card className="mt-8">


          <h2 className="text-xl font-bold">
            Letzte Besichtigungen
          </h2>


          <div className="mt-5 space-y-4">


            {
              dashboard.latestViewings.map((viewing:any)=>(


                <div
                  key={viewing.id}
                  className="flex justify-between rounded-xl bg-slate-50 p-4"
                >


                  <div>

                    <p className="font-semibold">
                      {viewing.title}
                    </p>


                    <p className="text-sm text-slate-500">
                      {viewing.city}
                    </p>

                  </div>



                  <Badge
                    variant={
                      viewing.status === "accepted"
                      ? "success"
                      :
                      viewing.status === "declined"
                      ? "danger"
                      :
                      "warning"
                    }
                  >
                    {viewing.status}
                  </Badge>


                </div>


              ))
            }


          </div>


        </Card>



      </div>


    </main>

  );

}




