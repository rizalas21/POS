import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await prisma.user.findMany();
    console.log("Users retrieved from database: ", res); // Tambahkan log ini
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error when trying to get users: ", error);
  }
}
