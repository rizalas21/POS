import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const { email } = await params;
    console.log(email);
    const res = await prisma.users.findFirst({
      where: { email },
      select: { userid: true, email: true, name: true, role: true },
    });
    if (!res) return NextResponse.json(`users with email ${email} not found`);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when get purchases : ", error);
    return NextResponse.json("something when wrong when Get me: ");
  }
}
