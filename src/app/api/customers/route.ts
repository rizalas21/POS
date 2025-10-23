import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma";
import cloudinary from "@/lib/cloudinary";

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
  const sortBy = (await req.nextUrl.searchParams.get("sortBy")) || "customerid";
  const sort = (await req.nextUrl.searchParams.get("sort")) || "desc";
  const limit = Number(await req.nextUrl.searchParams.get("limit")) || 3;
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
    const total = await prisma.customers.count({ where: filterCondition });
    const res = await prisma.customers.findMany({
      where: filterCondition,
      orderBy: { [sortBy]: sort },
      ...(limit > 0 && { take: limit, skip: offset }),
    });
    const pages = Math.ceil(total / limit);

    return NextResponse.json({ data: res, total, pages, page });
  } catch (error) {
    console.log("Error when trying to get customers: ", error);
    return NextResponse.json("failed to get customers");
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const res = await prisma.customers.create({
      data,
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error when trying to POST customer: ", error);
    return NextResponse.json("something went wrong when try to add customer");
  }
}
