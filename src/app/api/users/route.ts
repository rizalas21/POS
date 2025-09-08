import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req: NextRequest) {
  try {
    const res = await prisma.user.findMany({
      select: { userid: true, email: true, name: true, role: true },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error when trying to get users: ", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    console.log("data back end => ", data);
    const existingUser = await prisma.user.findFirst({
      where: { email: data.email },
      select: { userid: true, email: true, name: true, role: true },
    });
    if (existingUser)
      return NextResponse.json("user is already exist", { status: 402 });

    const newPass = await bcrypt.hash(data.password, 10);
    const res = await prisma.user.create({
      data: {
        ...data,
        password: newPass,
        role: data.role || "ADMIN",
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error when trying to POST users: ", error);
  }
}
