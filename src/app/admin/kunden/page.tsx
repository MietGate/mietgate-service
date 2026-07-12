import { getAdminCustomers } from "@/services/admin/customers";


export default async function KundenPage() {

  const customers = await getAdminCustomers();


  return (

    <div>

      <h1 className="text-3xl font-bold">
        Kunden
      </h1>


      <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Stadt
              </th>

              <th className="p-4 text-left">
                Budget
              </th>

              <th className="p-4 text-left">
                Profil
              </th>

            </tr>

          </thead>


          <tbody>


            {customers.map((customer:any)=>(

              <tr
              key={customer.id}
              className="border-t"
              >

                <td className="p-4">
                  {customer.full_name || "-"}
                </td>


                <td className="p-4">
                  {customer.city || "-"}
                </td>


                <td className="p-4">
                  {customer.budget
                    ? `${customer.budget} €`
                    : "-"
                  }
                </td>


                <td className="p-4">

                  {customer.profile_completed
                    ? "✅ Fertig"
                    : "⏳ Offen"
                  }

                </td>


              </tr>

            ))}


          </tbody>

        </table>


      </div>


    </div>

  );

}