import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { invoice: string } }
) {
  try {
    const { invoice } = await params;
    if (!invoice) return NextResponse.json("id not found");
    const res = await prisma.purchases.findFirst({
      where: { invoice },
    });
    if (!res)
      return NextResponse.json(`invoice with invoice ${invoice} not found`);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when get purchases : ", error);
    return NextResponse.json("something when wrong when Get purchases: ");
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { invoice: string } }
) {
  try {
    const data = await req.json();
    const { invoice } = await params;

    const res = await prisma.purchases.update({
      where: { invoice },
      data,
    });

    if (!res) return NextResponse.json("something when wrong in res => ", res);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when update purchases : ", error);
    return NextResponse.json("failed to put purchases");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { invoice: string } }
) {
  try {
    const { invoice } = await params;
    if (!invoice) {
      return NextResponse.json(
        { error: "invoice is required in the URL." },
        { status: 400 }
      );
    }

    const res = await prisma.purchases.delete({
      where: { invoice },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when delete purchase : ", error);
    return NextResponse.json("failed to delete purchase");
  }
}
