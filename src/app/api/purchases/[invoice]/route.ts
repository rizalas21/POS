import { prisma } from "@/app/prisma";
import { connect } from "http2";
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
      include: { purchaseitems: true },
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
    const datas = await req.json();
    const { supplier, operator, purchaseitems, ...resData } = datas;
    console.log("res data nya bro: ", resData);
    const { invoice } = await params;
    const existingPurchases = await prisma.purchases.findFirst({
      where: { invoice },
      include: { purchaseitems: true },
    });

    if (!existingPurchases) {
      return NextResponse.json(
        { error: "Purchase not found" },
        { status: 404 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatePurchases = await tx.purchases.update({
        where: { invoice },
        data: {
          ...resData,
          suppliers: { connect: { supplierid: supplier } },
          users: { connect: { userid: operator } },
        },
      });
      for (const data of datas?.purchaseitems || []) {
        console.log("Data bro: ", data);
        if (!data.id) {
          await tx.purchaseitems.create({
            data: {
              ...data,
              invoice,
            },
          });
        }
      }

      for (const old of existingPurchases?.purchaseitems || []) {
        const stillExisting = purchaseitems.find((i: any) => i.id === old.id);
        if (!stillExisting)
          await tx.purchaseitems.delete({ where: { id: old.id } });
      }

      return await tx.purchases.findUnique({
        where: { invoice },
        include: { purchaseitems: true },
      });
    });
    return NextResponse.json(result);
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

    const result = await prisma.$transaction(async (tx) => {
      await tx.purchaseitems.deleteMany({ where: { invoice } });
      const res = await tx.purchases.delete({ where: { invoice } });
      return res;
    });
    return NextResponse.json(result);
  } catch (error) {
    console.log("error when delete purchase : ", error);
    return NextResponse.json("failed to delete purchase");
  }
}
