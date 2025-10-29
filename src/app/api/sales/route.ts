import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";

export async function GET(req: NextRequest) {
  // harus ada (PRAMS)
  // 1. keyword
  // 2. limit
  // 3. page
  // 4. sort
  // 5. sortBy

  // harus ada (RETURN FRONT END)
  // 1. page
  // 2. total
  // 3. pages

  const keyword = (await req.nextUrl.searchParams.get("keyword")) || "";
  const sortBy = (await req.nextUrl.searchParams.get("sortBy")) || "name";
  const sort = (await req.nextUrl.searchParams.get("sort")) || "asc";
  const limit = Number(await req.nextUrl.searchParams.get("limit")) || 0;
  const page = Number(await req.nextUrl.searchParams.get("page")) || 1;
  const offset = (page - 1) * limit;
  const filterCondition = {
    OR: [
      { invoice: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
    ],
  };
  try {
    const total = await prisma.sales.count({ where: filterCondition });
    const res = await prisma.sales.findMany({
      where: filterCondition,
      orderBy:
        sortBy === "customer"
          ? { customers: { name: sort === "asc" ? "asc" : "desc" } }
          : { [sortBy]: sort },
      ...(limit > 0 && { take: limit, skip: offset }),
      include: {
        customers: {
          select: {
            name: true,
          },
        },
      },
    });
    const pages = Math.ceil(total / limit);

    return NextResponse.json({ data: res, total, pages, page });
  } catch (error) {
    console.log("Error when trying to get sales: ", error);
    return NextResponse.json("failed to get sales");
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { saleitems, ...dataWithoutItems } = data;
    const result = await prisma.$transaction(async (tx) => {
      const createSales = await tx.sales.create({
        data: { ...dataWithoutItems, time: new Date(dataWithoutItems.time) },
      });

      await tx.saleitems.createMany({ data: saleitems });

      return createSales;
    });
    return NextResponse.json(result);
  } catch (error) {
    console.log("Error when trying to POST sales: ", error);
    return NextResponse.json("error when try to post sales");
  }
}
