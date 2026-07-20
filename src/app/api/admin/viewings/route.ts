import { NextResponse } from "next/server";
import { updateViewingStatus } from "@/services/admin/update-viewing";


export async function POST(req:Request){

  const body = await req.json();


  const success = await updateViewingStatus(
    body.id,
    body.status
  );


  return NextResponse.json({
    success
  });

}


