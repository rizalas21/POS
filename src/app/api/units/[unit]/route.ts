import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { unit: string } }
) {
  try {
    const { unit } = await params;
    console.log("ini unit nya bro => ", unit);
    if (!unit) return NextResponse.json("id not found");
    const res = await prisma.units.findFirst({
      where: { unit },
      select: { unit: true, name: true, note: true },
    });
    if (!res) return NextResponse.json(`unit with unit ${unit} not found`);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when get unit : ", error);
    return NextResponse.json("something when wrong when Get unit: ");
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { unit: string } }
) {
  try {
    const data = await req.json();
    const { unit } = await params;

    const res = await prisma.units.update({
      where: { unit: unit },
      data,
      select: { unit: true, name: true, note: true },
    });

    if (!res) return NextResponse.json("something when wrong in res => ", res);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when update units : ", error);
    return NextResponse.json("failed to put user");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { unit: string } }
) {
  try {
    const { unit } = await params;
    if (!unit) {
      return NextResponse.json(
        { error: "unit is required in the URL." },
        { status: 400 }
      );
    }

    const res = await prisma.units.delete({
      where: { unit },
      select: { unit: true, name: true, note: true },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when delete user : ", error);
    return NextResponse.json("failed to delete user");
  }
}
