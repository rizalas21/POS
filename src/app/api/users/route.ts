import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await prisma.user.findMany();
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when try to get users : ", error);
  }
}
