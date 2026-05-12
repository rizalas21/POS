import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { userid, oldPassword, newPassword, confirmPassword } =
      await req.json();

    if (!userid || !oldPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "All field are required",
        },
        {
          status: 400,
        },
      );
    }

    const user = await prisma.users.findUnique({ where: { userid } });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
        status: 404,
      });
    }

    const isMatch = bcrypt.compareSync(oldPassword, user.password);

    console.log(isMatch);

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Old Password is incorrect",
          field: "oldPassword",
        },
        { status: 401 },
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Password confirmation does not match",
          field: "confirmPassword",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
      where: { userid },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Password updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
