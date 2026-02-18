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
  const sortBy = (await req.nextUrl.searchParams.get("sortBy")) || "name";
  const sort = (await req.nextUrl.searchParams.get("sort")) || "asc";
  const limit = Number(await req.nextUrl.searchParams.get("limit"));
  const page = Number(await req.nextUrl.searchParams.get("page")) || 1;
  const offset = (page - 1) * limit;
  const filterCondition = {
    OR: [
      { barcode: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
      { name: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
    ],
  };
  try {
    const total = await prisma.goods.count({ where: filterCondition });
    const res = await prisma.goods.findMany({
      where: filterCondition,
      orderBy: { [sortBy]: sort },
      ...(limit > 0 && { take: limit, skip: offset }),
    });
    console.log("response goods api", limit);
    const pages = Math.ceil(total / limit);
    return NextResponse.json({ data: res, total, pages, page });
  } catch (error) {
    console.log("Error when trying to get goods: ", error);
    return NextResponse.json("failed to get goods");
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    console.log("ini req back end: ", data);
    const barcode = data.get("barcode") as string;
    const name = data.get("name") as string;
    const stock = Number(data.get("stock"));
    const purchaseprice = Number(data.get("purchaseprice"));
    const sellingprice = Number(data.get("sellingprice"));
    const unit = data.get("unit") as string;
    const picture = data.get("picture") as File | null;

    let imageUrl: string | null = null;

    if (picture) {
      const bytes = await picture.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      const mime = picture.type;
      const base64Image = `data:${mime};base64,${base64}`;

      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "post-db",
      });
      imageUrl = await result.secure_url;
    }
    const existingunit = await prisma.goods.findUnique({
      where: { barcode },
    });
    console.log("line 75", existingunit);
    if (existingunit)
      return NextResponse.json("unit is already exist", { status: 402 });

    const res = await prisma.goods.create({
      data: {
        barcode,
        name,
        stock,
        purchaseprice,
        sellingprice,
        unit,
        picture: imageUrl,
      },
    });
    console.log("barcode iki bro -> ", res);
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error when trying to POST goods: ", error);
    return NextResponse.json("something went wrong when try to add goods");
  }
}
