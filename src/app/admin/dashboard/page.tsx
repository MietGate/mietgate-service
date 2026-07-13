import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { getAdminStats } from "@/services/admin/dashboard";

import {
  Users,
  FileText,
  CalendarCheck,
  AlertCircle,
} from "lucide-react";


export default async function AdminDashboardPage() {


  const dashboard = await getAdminStats();



  return (

    <main className="min-h-screen bg-slate-50 p-8">


      <h1 className="text-3xl font-bold text-slate-900">
        Admin Dashboard
      </h1>


      <p className="mt-2 text-slate-600">
        Übersicht über MietGate Kunden und Bewerbungen
      </p>





      {/* STATISTIKEN */}


      <div className="mt-8 grid gap-6 md:grid-cols-4">



        <Card className="p-6">

          <Users className="text-teal-600"/>

          <h3 className="mt-4 font-semibold">
            Kunden
          </h3>

          <p className="mt-2 text-3xl font-bold">
            {dashboard.customers}
          </p>

          <p className="text-sm text-slate-500">
            aktive Nutzer
          </p>

        </Card>





        <Card className="p-6">

          <FileText className="text-teal-600"/>

          <h3 className="mt-4 font-semibold">
            Bewerbungen
          </h3>

          <p className="mt-2 text-3xl font-bold">
            {dashboard.applications}
          </p>

          <p className="text-sm text-slate-500">
            laufende Bewerbungen
          </p>

        </Card>





        <Card className="p-6">

          <CalendarCheck className="text-teal-600"/>

          <h3 className="mt-4 font-semibold">
            Besichtigungen
          </h3>

          <p className="mt-2 text-3xl font-bold">
            {dashboard.viewings}
          </p>

          <p className="text-sm text-slate-500">
            kommende Termine
          </p>

        </Card>





        <Card className="p-6">

          <AlertCircle className="text-red-600"/>

          <h3 className="mt-4 font-semibold">
            Aktionen nötig
          </h3>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {dashboard.alerts}
          </p>

          <p className="text-sm text-slate-500">
            Absagen / Meldungen
          </p>

        </Card>


      </div>






      {/* ABSAGEN */}


      <Card className="mt-8 p-8">


        <h2 className="text-xl font-bold text-red-600">
          ⚠️ Abgesagte Besichtigungen
        </h2>


        <div className="mt-5 space-y-4">


          {dashboard.declinedViewings.length === 0 && (

            <p className="text-slate-500">
              Keine Absagen vorhanden.
            </p>

          )}




          {dashboard.declinedViewings.map((viewing:any)=>(


            <div
              key={viewing.id}
              className="rounded-xl border p-5"
            >


              <h3 className="font-bold">
                {viewing.title}
              </h3>


              <p className="text-slate-500">
                {viewing.address}, {viewing.city}
              </p>



              <p className="mt-3">
                Kunde:
                <span className="ml-2 font-semibold">
                  {viewing.customer?.full_name || "-"}
                </span>
              </p>


              <p className="text-sm text-slate-500">
                {viewing.customer?.email || "-"}
              </p>



              <Badge variant="danger">
                Abgesagt
              </Badge>


            </div>


          ))}



        </div>


      </Card>








      {/* LETZTE AKTIVITÄTEN */}


      <Card className="mt-8 p-8">


        <h2 className="text-xl font-bold">
          Letzte Besichtigungen
        </h2>


        <div className="mt-5 space-y-4">


          {dashboard.latestViewings.map((viewing:any)=>(


            <div
              key={viewing.id}
              className="flex justify-between rounded-xl bg-white p-4 shadow-sm"
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
                  : viewing.status === "declined"
                  ? "danger"
                  : "warning"
                }
              >
                {viewing.status}
              </Badge>


            </div>


          ))}


        </div>


      </Card>



    </main>

  );

}