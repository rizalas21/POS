import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { invoice: string } }
) {
  try {
    console.log(req);
    const { invoice } = params;
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
