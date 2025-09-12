import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { barcode: string } }
) {
  try {
    const { barcode } = await params;
    if (!barcode) return NextResponse.json("barcode not found");
    const res = await prisma.goods.findFirst({
      where: { barcode },
    });
    if (!res)
      return NextResponse.json(`barcode with barcode ${barcode} not found`);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when get barcode : ", error);
    return NextResponse.json("something when wrong when Get unit: ");
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { barcode: string } }
) {
  try {
    const data = await req.json();
    const { barcode } = await params;

    const res = await prisma.goods.update({
      where: { barcode },
      data,
    });

    if (!res) return NextResponse.json("something when wrong in res => ", res);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when update units : ", error);
    return NextResponse.json("failed to put goods");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { barcode: string } }
) {
  try {
    const { barcode } = await params;
    if (!barcode) {
      return NextResponse.json(
        { error: "barcode is required in the URL." },
        { status: 400 }
      );
    }

    const res = await prisma.goods.delete({
      where: { barcode },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when delete goods : ", error);
    return NextResponse.json("failed to delete goods");
  }
}
