"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";


const types = [
  "Personalausweis",
  "Schufa",
  "Einkommensnachweis",
  "Mieterselbstauskunft",
  "Arbeitsvertrag"
];


export default function DokumentePage(){

  const supabase = createClient();

  const [files,setFiles] = useState<any[]>([]);
  const [file,setFile] = useState<File | null>(null);
  const [type,setType] = useState(types[0]);
  const [message,setMessage] = useState("");



  async function loadFiles(){

    const {
      data:{
        user
      }
    } = await supabase.auth.getUser();


    if(!user) return;


    const {data}=await supabase
    .from("documents")
    .select("*")
    .eq("user_id",user.id)
    .order("created_at",{ascending:false});


    setFiles(data || []);

  }



  useEffect(()=>{

    loadFiles();

  },[]);



  async function upload(){

    if(!file) return;


    const {
      data:{
        user
      }
    }=await supabase.auth.getUser();


    if(!user) return;


    const path=`${user.id}/${Date.now()}-${file.name}`;


    const {error}=await supabase
    .storage
    .from("documents")
    .upload(path,file);


    if(error){

      setMessage(error.message);
      return;

    }



    await supabase
    .from("documents")
    .insert({
  user_id:user.id,
  document_type:type,
  file_url:path,
  status:"uploaded"
});



    setMessage("Dokument gespeichert");

    setFile(null);

    loadFiles();

  }




  async function deleteFile(id:string,path:string){


    await supabase
    .storage
    .from("documents")
    .remove([path]);



    await supabase
    .from("documents")
    .delete()
    .eq("id",id);



    loadFiles();

  }




  async function preview(path:string){

    const {data}=await supabase
    .storage
    .from("documents")
    .createSignedUrl(path,60);


    if(data?.signedUrl){

      window.open(data.signedUrl,"_blank");

    }

  }




return (

<main className="min-h-screen bg-slate-50 p-6">

<div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow">


<h1 className="text-3xl font-bold">
Dokumente
</h1>


<select
className="mt-6 w-full rounded-xl border p-3"
value={type}
onChange={(e)=>setType(e.target.value)}
>

{types.map(t=>(

<option key={t}>
{t}
</option>

))}

</select>



<input
className="mt-4"
type="file"
accept=".pdf,image/*"
onChange={(e)=>setFile(e.target.files?.[0] || null)}
/>



<button
onClick={upload}
className="mt-4 w-full rounded-xl bg-teal-600 py-3 text-white"
>
Hochladen
</button>



<p className="mt-4">
{message}
</p>



<div className="mt-8 space-y-3">


<h2 className="font-bold">
Meine Dokumente ({files.length}/5)
</h2>


{files.map(doc=>(

<div
key={doc.id}
className="flex justify-between rounded-xl border p-4"
>


<div>

<p className="font-semibold">
{doc.type}
</p>

<p className="text-sm text-slate-500">
{doc.name}
</p>

</div>



<div className="flex gap-3">

<button
onClick={()=>preview(doc.file_url)}
className="text-teal-600"
>
Öffnen
</button>


<button
onClick={()=>deleteFile(doc.id,doc.file_url)}
className="text-red-600"
>
Löschen
</button>


</div>


</div>

))}


</div>


</div>

</main>

);

}