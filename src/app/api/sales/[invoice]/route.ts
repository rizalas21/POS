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
    console.log("datas nya bro: ", datas);
    console.log("res data nya bro: ", resData);
    const { invoice } = await params;
    const existingSales = await prisma.sales.findFirst({
      where: { invoice },
      include: { saleitems: true },
    });

    if (!customer || !operator)
      return NextResponse.json(
        { error: "customer or operator not found" },
        { status: 404 }
      );

    if (!existingSales) {
      return NextResponse.json({ error: "Sales not found" }, { status: 404 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const updateSales = await tx.sales.update({
        where: { invoice },
        data: {
          ...resData,
          customers: { connect: { customerid: customer } },
          users: { connect: { userid: operator } },
        },
      });
      for (const data of datas?.saleitems || []) {
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
    console.log("error when update Sales : ", error);
    return NextResponse.json("failed to put Sales");
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
      await tx.saleitems.deleteMany({ where: { invoice } });
      const res = await tx.sales.deleteMany({ where: { invoice } });
      return res;
    });
    return NextResponse.json(result);
  } catch (error) {
    console.log("error when delete sales : ", error);
    return NextResponse.json("failed to delete sales");
  }
}
