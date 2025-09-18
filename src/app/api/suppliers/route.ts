import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
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
      { name: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
      { address: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
      { phone: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
    ],
  };
  try {
    const total = await prisma.suppliers.count({ where: filterCondition });
    const res = await prisma.suppliers.findMany({
      where: filterCondition,
      orderBy: { [sortBy]: sort },
      ...(limit > 0 && { take: limit, skip: offset }),
    });
    const pages = Math.ceil(total / limit);

    return NextResponse.json({ data: res, total, pages, page });
  } catch (error) {
    console.log("Error when trying to get suppliers: ", error);
    return NextResponse.json("failed to get suppliers");
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, address, phone } = data;
    const existingSuppliers = await prisma.suppliers.findFirst({
      where: { name: data.name },
    });
    if (existingSuppliers)
      return NextResponse.json("suppliers contact is already exist", {
        status: 402,
      });

    const res = await prisma.suppliers.create({
      data: { name, address, phone },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error when trying to POST suppliers: ", error);
    return NextResponse.json("error when post suppliers");
  }
}
