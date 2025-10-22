import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    if (!id) {
      return NextResponse.json(
        { error: "id is required in the URL." },
        { status: 400 }
      );
    }

    const res = await prisma.purchaseitems.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when delete goods : ", error);
    return NextResponse.json("failed to delete goods");
  }
}
