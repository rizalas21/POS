import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "../../prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, name, password, role } = await req.json();
    const existingUser = await prisma.users.findFirst({ where: { email } });
    if (existingUser)
      return NextResponse.json("user is already exist", { status: 402 });

    const newPass = await bcrypt.hash(password, 10);
    const res = await prisma.users.create({
      data: {
        email,
        name,
        password: newPass,
        role: role || "ADMIN",
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when register user: ", error);
    return NextResponse.json({ status: 500 });
  }
}
