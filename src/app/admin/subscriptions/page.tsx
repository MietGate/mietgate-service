import { createAdminClient } from "@/lib/supabase/admin";

import Card from "@/components/ui/Card";

import StripePortalButton from "@/components/admin/StripePortalButton";



export default async function AdminSubscriptionsPage(){


  const supabase =
    createAdminClient();



  const {
    data:subscriptions
  } =
  await supabase
    .from("subscriptions")
    .select(`
      id,
      plan,
      price,
      active,
      subscription_status,
      current_period_end,
      cancel_at_period_end,
      stripe_customer_id,
      stripe_subscription_id,
      user_id
    `)
    .order(
      "created_at",
      {
        ascending:false
      }
    );





  const userIds =
    subscriptions?.map(
      item => item.user_id
    ) || [];





  const {
    data:profiles
  } =
  await supabase
    .from("profiles")
    .select(
      "id,full_name,email"
    )
    .in(
      "id",
      userIds
    );





  const activeSubscriptions =
    subscriptions?.filter(
      item => item.active
    ) || [];




  const monthlyRevenue =
    activeSubscriptions.reduce(
      (sum,item)=> sum + (item.price || 0),
      0
    );





  return (

    <div className="p-6 space-y-6">


      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Abonnements
        </h1>


        <p className="text-slate-600 mt-2">
          Übersicht aller MietGate Premium Kunden
        </p>


      </div>





      <div className="grid gap-4 md:grid-cols-3">


        <Card>

          <h3 className="text-sm text-slate-500">
            Premium Kunden
          </h3>

          <p className="mt-2 text-3xl font-bold">
            {subscriptions?.length || 0}
          </p>

        </Card>




        <Card>

          <h3 className="text-sm text-slate-500">
            Aktive Abos
          </h3>

          <p className="mt-2 text-3xl font-bold">
            {activeSubscriptions.length}
          </p>

        </Card>




        <Card>

          <h3 className="text-sm text-slate-500">
            Monatlicher Umsatz
          </h3>

          <p className="mt-2 text-3xl font-bold">
            {(monthlyRevenue / 100).toFixed(2)} €
          </p>

        </Card>


      </div>






      <div className="space-y-4">


        {
          subscriptions?.map((subscription)=>{


            const profile =
              profiles?.find(
                user =>
                  user.id === subscription.user_id
              );



            return (

              <Card key={subscription.id}>


                <div className="flex flex-col gap-4 md:flex-row md:justify-between">


                  <div>


                    <h2 className="text-xl font-bold">
                      {profile?.full_name || "Unbekannter Kunde"}
                    </h2>



                    <p className="text-sm text-slate-500">
                      {profile?.email}
                    </p>




                    <p className="mt-2 text-sm">

                      Tarif:
                      {" "}

                      <span className="font-semibold">
                        {subscription.plan}
                      </span>

                    </p>




                    {
                      subscription.stripe_customer_id && (

                        <StripePortalButton
                          customerId={
                            subscription.stripe_customer_id
                          }
                        />

                      )
                    }



                  </div>






                  <div className="text-sm space-y-2">


                    <p>
                      Preis:
                      {" "}
                      <strong>
                        {(subscription.price / 100).toFixed(2)} €
                      </strong>
                    </p>




                    <p>

                      Status:
                      {" "}

                      <strong>

                        {
                          subscription.active
                          ?
                          "Aktiv"
                          :
                          "Inaktiv"
                        }

                      </strong>

                    </p>




                    <p>

                      Verlängerung:
                      {" "}

                      {
                        subscription.current_period_end
                        ?
                        new Date(
                          subscription.current_period_end
                        ).toLocaleDateString("de-DE")
                        :
                        "-"
                      }

                    </p>




                    {
                      subscription.cancel_at_period_end && (

                        <p className="text-red-600 font-semibold">
                          Kündigung vorgemerkt
                        </p>

                      )
                    }


                  </div>



                </div>



              </Card>

            );


          })

        }


      </div>


    </div>

  );


}




