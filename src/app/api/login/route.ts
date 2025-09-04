import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (!existingUser)
      return NextResponse.json("user not found", { status: 404 });

    const matchPass = await bcrypt.compare(password, existingUser.password);

    if (!matchPass) return NextResponse.json("Email or Password doesn't match");
    const User = { ...existingUser };

    return NextResponse.json(User);
  } catch (error) {
    console.log("error when login: ", error);
    NextResponse.json(error, { status: 500 });
  }
}
