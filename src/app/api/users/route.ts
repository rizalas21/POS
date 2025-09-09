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
  // 1. offset
  // 2. total
  // 3. pages

  const keyword = (await req.nextUrl.searchParams.get("keyword")) || "";
  const sortBy = (await req.nextUrl.searchParams.get("sortBy")) || "email";
  const sort = (await req.nextUrl.searchParams.get("sort")) || "desc";
  const limit = Number(await req.nextUrl.searchParams.get("limit")) || 3;
  const page = Number(await req.nextUrl.searchParams.get("page")) || 1;
  const offset = (page - 1) * limit;
  const filterCondition = {
    OR: [
      { email: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
      { name: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
      { role: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
    ],
  };

  console.log("masuk limit => ", limit);
  try {
    const total = await prisma.user.count({ where: filterCondition });
    const res = await prisma.user.findMany({
      where: filterCondition,
      orderBy: { [sortBy]: sort },
      select: { userid: true, email: true, name: true, role: true },
      take: limit,
      skip: offset,
    });
    const pages = Math.ceil(total / limit);

    return NextResponse.json({ data: res, total, pages, page });
  } catch (error) {
    console.log("Error when trying to get users: ", error);
    return NextResponse.json("failed to get users");
  }
}

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    const existingUser = await prisma.user.findFirst({
      where: { email: data.email },
      select: { userid: true, email: true, name: true, role: true },
    });
    if (existingUser)
      return NextResponse.json("user is already exist", { status: 402 });

    const newPass = await bcrypt.hash(data.password, 10);
    const res = await prisma.user.create({
      data: {
        ...data,
        password: newPass,
        role: data.role || "ADMIN",
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error when trying to POST users: ", error);
  }
}
