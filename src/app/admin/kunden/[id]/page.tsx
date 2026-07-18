import { getCustomerDetail } from "@/services/admin/customer-detail";
import CustomerCRMDetail from "./CustomerCRMDetail";


export default async function CustomerPage({
  params
}:{
  params: Promise<{
    id:string
  }>
}){


  const { id } = await params;



  const customer =
    await getCustomerDetail(id);



  if(!customer){

    return (

      <div className="p-8">
        Kunde nicht gefunden
      </div>

    );

  }



  return (

    <CustomerCRMDetail
      customer={customer}
    />

  );


}
