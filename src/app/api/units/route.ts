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
      { unit: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
      { name: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
      { note: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
    ],
  };
  try {
    const total = await prisma.units.count({ where: filterCondition });
    const res = await prisma.units.findMany({
      where: filterCondition,
      orderBy: { [sortBy]: sort },
      select: { unit: true, name: true, note: true },
      ...(limit > 0 && { take: limit, skip: offset }),
    });
    const pages = Math.ceil(total / limit);

    return NextResponse.json({ data: res, total, pages, page });
  } catch (error) {
    console.log("Error when trying to get units: ", error);
    return NextResponse.json("failed to get units");
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const existingunit = await prisma.units.findFirst({
      where: { name: data.unit },
      select: { unit: true, name: true, note: true },
    });
    if (existingunit)
      return NextResponse.json("unit is already exist", { status: 402 });

    const res = await prisma.units.create({
      data,
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error when trying to POST units: ", error);
  }
}
