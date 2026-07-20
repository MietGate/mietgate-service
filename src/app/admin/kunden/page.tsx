import { getAdminCustomers } from "@/services/admin/customers";
import CustomerCRM from "@/components/admin/CustomerCRM";


export default async function KundenPage() {


  const customers = await getAdminCustomers();



  return (

    <main className="min-h-screen bg-slate-50 p-8">


      <div className="mx-auto max-w-7xl">


        <h1 className="text-3xl font-bold text-slate-900">
          Kunden CRM
        </h1>


        <p className="mt-2 text-slate-600">
          Kundenverwaltung, Suchprofile und Bewerbungsprozesse
        </p>



        <div className="mt-8">

          <CustomerCRM
            customers={customers}
          />

        </div>


      </div>


    </main>

  );

}



