"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function ViewingActions({
  id
}:{
  id:string
}){

  const router = useRouter();

  const [loading,setLoading] = useState(false);



  async function updateStatus(status:string){

    setLoading(true);


    await fetch("/api/admin/viewings",{
      method:"POST",
      body:JSON.stringify({
        id,
        status
      })
    });


    setLoading(false);

    router.refresh();

  }



  return (

    <div className="flex flex-col gap-3">


      <button
        disabled={loading}
        onClick={()=>updateStatus("accepted")}
        className="rounded-xl bg-teal-600 px-5 py-3 text-white"
      >
        ✅ Zugesagt
      </button>



      <button
        disabled={loading}
        onClick={()=>updateStatus("rejected")}
        className="rounded-xl bg-red-600 px-5 py-3 text-white"
      >
        ❌ Abgesagt
      </button>


    </div>

  );

}