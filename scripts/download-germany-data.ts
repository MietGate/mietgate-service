import fs from "fs";
import axios from "axios";
import AdmZip from "adm-zip";


const url =
  "https://download.geonames.org/export/dump/DE.zip";



async function download(){


  console.log("Download Deutschland Daten...");



  const response = await axios.get(
    url,
    {
      responseType:"arraybuffer"
    }
  );



  fs.writeFileSync(
    "data/DE.zip",
    response.data
  );



  console.log(
    "ZIP gespeichert"
  );



  const zip = new AdmZip(
    "data/DE.zip"
  );


  zip.extractAllTo(
    "data/germany",
    true
  );



  console.log(
    "Entpackt"
  );


}



download();