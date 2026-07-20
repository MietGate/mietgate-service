import { createClient } from "@/lib/supabase/client";


export async function updateViewingStatus(
  id:string,
  status:string
){

  const response =
    await fetch("/api/viewings",{

      method:"PATCH",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        id,
        status

      })

    });


  return response.json();

}



