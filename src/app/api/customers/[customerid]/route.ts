import { prisma } from "@/app/prisma";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { customerid: string } }
) {
  try {
    const { customerid } = await params;
    if (!customerid) return NextResponse.json("customerid not found");
    const res = await prisma.customers.findFirst({
      where: { customerid: Number(customerid) },
    });
    if (!res)
      return NextResponse.json(
        `customerid with customerid ${customerid} not found`
      );
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when get customerid : ", error);
    return NextResponse.json("something when wrong when Get unit: ");
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { customerid: string } }
) {
  try {
    const data = await req.json();
    const { customerid } = await params;

    try {
      const res = await prisma.customers.update({
        where: { customerid: Number(customerid) },
        data,
      });

      return NextResponse.json(res);
    } catch (err) {
      console.error("Error update customers:", err);
      return NextResponse.json(
        { error: "Failed to update customers" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("error when update customers : ", error);
    return NextResponse.json("failed to put customers");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { customerid: string } }
) {
  const { customerid } = await params;
  console.log("ini customerid nya => ", customerid);
  try {
    if (!customerid) {
      return NextResponse.json(
        { error: "customerid is required in the URL." },
        { status: 400 }
      );
    }

    const res = await prisma.customers.delete({
      where: { customerid: Number(customerid) },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when delete customer : ", error);
    return NextResponse.json("failed to delete customer");
  }
}
