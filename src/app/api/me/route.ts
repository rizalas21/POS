import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userid = req.headers.get("user-id");
    if (!userid)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const existingUser = await prisma.user.findFirst({
      where: { userid },
    });
    if (!existingUser)
      return NextResponse.json("user not found", { status: 404 });
    const User = {
      userid: existingUser.userid,
      email: existingUser.email,
      name: existingUser.name,
      role: existingUser.role,
    };

    return NextResponse.json(User);
  } catch (error) {
    console.log("error when login: ", error);
    NextResponse.json(error, { status: 500 });
  }
}
