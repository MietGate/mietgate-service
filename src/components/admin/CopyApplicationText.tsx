"use client";

export default function CopyApplicationText({
  text
}:{
  text:string;
}){


  function copy(){

    navigator.clipboard.writeText(text);

    alert("Bewerbungstext kopiert");

  }


  return (

    <button

      onClick={copy}

      className="
      mt-4
      rounded-xl
      bg-teal-600
      px-5
      py-3
      text-white
      "

    >

      Text kopieren

    </button>

  );

}
