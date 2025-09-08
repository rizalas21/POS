import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json("id not found");
    const res = await prisma.user.findFirst({
      where: { userid: id },
      select: { userid: true, email: true, name: true, role: true },
    });
    if (!res) return NextResponse.json(`user with id ${id} not found`);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when get user : ", error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data } = await req.json();
    const { id } = await params;

    const res = await prisma.user.update({
      where: { userid: id },
      data: { ...data },
      select: { userid: true, email: true, name: true, role: true },
    });

    if (!res) return NextResponse.json("something when wrong in res => ", res);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when update user : ", error);
    return NextResponse.json("failed to put user");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    console.log("masuk id nya bro => ", id);
    if (!id) {
      return NextResponse.json(
        { error: "users ID is required in the URL." },
        { status: 400 }
      );
    }

    const res = await prisma.user.delete({
      where: { userid: id },
      select: { userid: true, email: true, name: true, role: true },
    });
    console.log("masuk res nya bro => ", res);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when delete user : ", error);
    return NextResponse.json("failed to delete user");
  }
}
