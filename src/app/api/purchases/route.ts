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
      { invoice: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
    ],
  };
  try {
    const total = await prisma.purchases.count({ where: filterCondition });
    const res = await prisma.purchases.findMany({
      where: filterCondition,
      orderBy: { [sortBy]: sort },
      ...(limit > 0 && { take: limit, skip: offset }),
    });
    const pages = Math.ceil(total / limit);

    return NextResponse.json({ data: res, total, pages, page });
  } catch (error) {
    console.log("Error when trying to get purchases: ", error);
    return NextResponse.json("failed to get purchases");
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("data back end: ", data);
    const res = await prisma.purchases.create({
      data,
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error when trying to POST purchases: ", error);
    NextResponse.json("error when try to post purchases");
  }
}
