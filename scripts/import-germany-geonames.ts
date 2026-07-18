import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";


dotenv.config({
  path: ".env.local"
});



const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL!,

  process.env.SUPABASE_SERVICE_ROLE_KEY!

);




const file = path.join(
  "data",
  "germany",
  "DE.txt"
);







async function importData(){


  console.log(
    "Starte Deutschland Import..."
  );



  const content =
    fs.readFileSync(
      file,
      "utf8"
    );



  const rows =
    content
      .split("\n")
      .filter(Boolean);




  let count = 0;




  for(
    const row of rows
  ){



    const cols =
      row.split("\t");



    const name =
      cols[1];



    const feature =
      cols[6];



    const state =
      cols[10];



    const postcode =
      cols[13];





    if(
      !name ||
      feature !== "P"
    ){

      continue;

    }





    const {
      error
    } =
    await supabase
      .from("cities")
      .upsert(

        {

          name,

          state,

          postcode

        },

        {

          onConflict:
          "name,state"

        }

      );





    if(error){

      console.log(
        "FEHLER:",
        name,
        error.message
      );


    }else{


      count++;


      if(
        count % 100 === 0
      ){

        console.log(
          "Importiert:",
          count
        );

      }

    }



  }





  console.log(
    "FERTIG Städte:",
    count
  );


}





importData();