"use client";

import dynamic from "next/dynamic";

const ApplicationKanban = dynamic(
  () => import("./ApplicationKanban"),
  {
    ssr:false
  }
);


export default function ApplicationKanbanWrapper({
  applications
}:{
  applications:any[];
}){

  return (
    <ApplicationKanban
      applications={applications}
    />
  );

}


