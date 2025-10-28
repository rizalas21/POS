import { prisma } from "@/app/prisma";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { invoice: string } }
) {
  try {
    const { invoice } = await params;
    if (!invoice) return NextResponse.json("invoice not found");
    const res = await prisma.sales.findFirst({
      where: { invoice },
      include: { saleitems: true },
    });
    if (!res)
      return NextResponse.json(`invoice with invoice ${invoice} not found`);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when get sales : ", error);
    return NextResponse.json("something when wrong when Get sales: ");
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { invoice: string } }
) {
  try {
    const datas = await req.json();
    const { customer, operator, saleitems, ...resData } = datas;
    console.log("res data nya bro: ", resData);
    const { invoice } = await params;
    const existingSales = await prisma.sales.findFirst({
      where: { invoice },
      include: { saleitems: true },
    });

    if (!existingSales) {
      return NextResponse.json(
        { error: "Purchase not found" },
        { status: 404 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const updateSales = await tx.sales.update({
        where: { invoice },
        data: {
          ...resData,
          suppliers: { connect: { customerid: customer } },
          users: { connect: { userid: operator } },
        },
      });
      for (const data of datas?.saleitems || []) {
        console.log("Data bro: ", data);
        if (!data.id) {
          await tx.saleitems.create({
            data: {
              ...data,
              invoice,
            },
          });
        }
      }

      for (const old of existingSales?.saleitems || []) {
        const stillExisting = saleitems.find((i: any) => i.id === old.id);
        if (!stillExisting)
          await tx.saleitems.delete({ where: { id: old.id } });
      }

      return await tx.sales.findUnique({
        where: { invoice },
        include: { saleitems: true },
      });
    });
    return NextResponse.json(result);
  } catch (error) {
    console.log("error when update sales : ", error);
    return NextResponse.json("failed to put sales");
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

    const res = await prisma.sales.delete({
      where: { invoice },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when delete purchase : ", error);
    return NextResponse.json("failed to delete purchase");
  }
}
