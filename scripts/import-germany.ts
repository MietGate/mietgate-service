import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import csv from "csv-parser";
import { createClient } from "@supabase/supabase-js";


dotenv.config({
  path: path.resolve(process.cwd(), ".env.local")
});



const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL!,

  process.env.SUPABASE_SERVICE_ROLE_KEY!

);




type CityRow = {

  name:string;

  state:string;

  postcode:string;

};



type DistrictRow = {

  city_name:string;

  district_name:string;

};





async function readCSV<T>(file:string):Promise<T[]>{


  return new Promise((resolve,reject)=>{


    const results:T[] = [];



    fs.createReadStream(file)

      .pipe(csv())

      .on(
        "data",
        (data)=>results.push(data)
      )

      .on(
        "end",
        ()=>resolve(results)
      )

      .on(
        "error",
        reject
      );


  });


}








async function importCities(){


  console.log(
    "Lese Städte..."
  );


  const cities =
    await readCSV<CityRow>(
      "data/cities.csv"
    );



  for(const city of cities){



    const {
      data,
      error
    } = await supabase
      .from("cities")
      .upsert(

        {

          name: city.name,

          state: city.state,

          postcode: city.postcode

        },

        {
          onConflict:"name,state"
        }

      )
      .select()
      .single();




    if(error){

      console.log(
        "CITY ERROR",
        error.message
      );

      continue;

    }



    console.log(
      "CITY:",
      data.name
    );


  }



}










async function importDistricts(){


  console.log(
    "Lese Stadtteile..."
  );



  const districts =
    await readCSV<DistrictRow>(
      "data/districts.csv"
    );




  for(const district of districts){



    const {
      data:city
    } = await supabase
      .from("cities")
      .select("id")
      .eq(
        "name",
        district.city_name
      )
      .single();




    if(!city){

      console.log(
        "CITY NOT FOUND:",
        district.city_name
      );

      continue;

    }




    const {
      error
    } = await supabase
      .from("districts")
      .upsert(

        {

          city_id:city.id,

          name:district.district_name

        },

        {
          onConflict:"city_id,name"
        }

      );




    if(error){

      console.log(
        "DISTRICT ERROR",
        error.message
      );

      continue;

    }


  }



  console.log(
    "Stadtteile fertig"
  );


}









async function main(){


  await importCities();


  await importDistricts();



  console.log(
    "IMPORT KOMPLETT"
  );


}



main();