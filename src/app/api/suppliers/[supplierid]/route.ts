import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { supplierid: number } }
) {
  try {
    const { supplierid } = await params;
    if (!supplierid) return NextResponse.json("id not found");
    const res = await prisma.suppliers.findFirst({
      where: { supplierid: Number(supplierid) },
      select: { name: true, address: true, phone: true },
    });
    if (!res)
      return NextResponse.json(
        `supplierid with supplierid ${supplierid} not found`
      );
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when get supplierid : ", error);
    return NextResponse.json("something when wrong when Get supplierid: ");
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { supplierid: number } }
) {
  try {
    const data = await req.json();
    console.log("ini datanya => ", data);
    const { supplierid } = await params;

    const res = await prisma.suppliers.update({
      where: { supplierid: Number(supplierid) },
      data,
    });

    if (!res) return NextResponse.json("something when wrong in res => ", res);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when update suppliers : ", error);
    return NextResponse.json("failed to put user");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { supplierid: number } }
) {
  try {
    const { supplierid } = await params;
    if (!supplierid) {
      return NextResponse.json(
        { error: "supplierid is required in the URL." },
        { status: 400 }
      );
    }

    const res = await prisma.suppliers.delete({
      where: { supplierid: Number(supplierid) },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when delete user : ", error);
    return NextResponse.json("failed to delete user");
  }
}
