import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { invoice: string } }
) {
  console.log("masuk sini");
  try {
    console.log("masuk dalam");
    const { invoice } = await params;
    if (!invoice) return NextResponse.json("invoice not found purchase item");
    const res = await prisma.purchaseitems.deleteMany({ where: { invoice } });
    if (!res)
      return NextResponse.json(
        `invoice with invoice ${invoice} not found, purchase item`
      );
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json("failed when try to delete purchase item invoice");
  }
}
