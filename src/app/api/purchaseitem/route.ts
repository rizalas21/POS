import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data);
    const res = await prisma.purchaseitems.createMany({ data });
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error when trying to POST purchase item: ", error);
    NextResponse.json("error when try to post purchases");
  }
}
