﻿export function calculateProfileProgress({

profile,
documents,
searchProfile

}:{

profile:any;
documents:any[];
searchProfile:any;

}){


let completed = 0;
let total = 3;



const parts = {

searchProfile:0,

documents:0,

applicant:0

};





//
// Suchprofil
//

if(searchProfile){

const fields = [

searchProfile.city,
searchProfile.rooms,
searchProfile.warm_rent,
searchProfile.move_in_date,
searchProfile.household_size

];


const filled =
fields.filter(Boolean).length;


parts.searchProfile =
Math.round(
(filled / fields.length) * 100
);


}





//
// Dokumente
//

if(documents){


parts.documents =
Math.round(

Math.min(
documents.length / 4,
1
)
*
100

);


}






//
// Bewerberprofil
//

if(profile){


const fields = [

profile.full_name,
profile.income,
profile.application_message

];


const filled =
fields.filter(Boolean).length;



parts.applicant =
Math.round(

(filled / fields.length)
*
100

);


}





const average = Math.round(

(
parts.searchProfile +
parts.documents +
parts.applicant

)
/
3

);





return {


total:average,


parts


};


}

