"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import DashboardShell from "@/components/layout/DashboardShell";
import Card from "@/components/ui/Card";


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




    const {
      data,
      error
    } = await supabase
      .from("documents")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .order(
        "created_at",
        {
          ascending:false
        }
      );



    if(error){

      console.log(error);

    }



    setFiles(data || []);


  }





  useEffect(()=>{

    loadFiles();

  },[]);







  async function upload(){


    if(!file){

      setMessage("Bitte Datei auswählen");

      return;

    }





    const {
      data:{
        user
      }
    } = await supabase.auth.getUser();




    if(!user) return;





    const path =
      `${user.id}/${Date.now()}-${file.name}`;







    const {
      error:uploadError
    }
    =
    await supabase
      .storage
      .from("documents")
      .upload(
        path,
        file
      );





    if(uploadError){

      setMessage(
        uploadError.message
      );

      return;

    }







    const {
      error:dbError
    }
    =
    await supabase
      .from("documents")
      .insert({

        user_id:user.id,

        document_type:type,

        file_url:path,

        status:"uploaded"

      });






    if(dbError){

      setMessage(
        dbError.message
      );

      return;

    }






    setMessage(
      "Dokument gespeichert ✓"
    );


    setFile(null);


    loadFiles();


  }









  async function deleteFile(
    id:string,
    path:string
  ){


    await supabase
      .storage
      .from("documents")
      .remove([
        path
      ]);




    await supabase
      .from("documents")
      .delete()
      .eq(
        "id",
        id
      );



    loadFiles();


  }









  async function preview(
    path:string
  ){


    const {
      data
    }
    =
    await supabase
      .storage
      .from("documents")
      .createSignedUrl(
        path,
        60
      );




    if(data?.signedUrl){

      window.open(
        data.signedUrl,
        "_blank"
      );

    }


  }









  return (


    <DashboardShell>


      <div className="space-y-8">





        <div>

          <h1 className="text-3xl font-bold text-slate-900">

            Dokumente

          </h1>


          <p className="mt-2 text-slate-600">

            Verwalte deine Unterlagen für deine Bewerbungen.

          </p>


        </div>








        <Card>


          <select

            className="
            w-full
            rounded-xl
            border
            p-3
            "

            value={type}

            onChange={
              e=>setType(e.target.value)
            }

          >

            {
              types.map(t=>(

                <option key={t}>

                  {t}

                </option>

              ))
            }


          </select>







          <input

            className="mt-4"

            type="file"

            accept=".pdf,image/*"

            onChange={
              e=>
              setFile(
                e.target.files?.[0] || null
              )
            }

          />








          <button

            onClick={upload}

            className="
            mt-4
            w-full
            rounded-xl
            bg-teal-600
            py-3
            text-white
            "

          >

            Hochladen


          </button>






          <p className="mt-4 text-teal-700">

            {message}

          </p>



        </Card>









        <Card>



          <h2 className="font-bold">

            Meine Dokumente ({files.length}/5)

          </h2>







          <div className="mt-6 space-y-3">



            {
              files.map(doc=>(


                <div

                  key={doc.id}

                  className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-4
                  "

                >




                  <div>


                    <p className="font-semibold">

                      {doc.document_type}

                    </p>



                    <p className="text-sm text-slate-500">

                      {doc.file_url}

                    </p>



                  </div>







                  <div className="flex gap-3">





                    <button

                      onClick={
                        ()=>preview(
                          doc.file_url
                        )
                      }

                      className="text-teal-600"

                    >

                      Ansehen


                    </button>







                    <button

                      onClick={
                        ()=>deleteFile(
                          doc.id,
                          doc.file_url
                        )
                      }

                      className="text-red-600"

                    >

                      Löschen


                    </button>





                  </div>





                </div>


              ))
            }




          </div>




        </Card>





      </div>


    </DashboardShell>


  );


}


