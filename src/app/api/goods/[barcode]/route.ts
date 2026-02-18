import { prisma } from "@/app/prisma";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { barcode: string } },
) {
  try {
    const { barcode } = await params;
    if (!barcode) return NextResponse.json("barcode not found");
    const res = await prisma.goods.findFirst({
      where: { barcode },
    });
    if (!res)
      return NextResponse.json(`barcode with barcode ${barcode} not found`);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when get barcode : ", error);
    return NextResponse.json("something when wrong when Get unit: ");
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { barcode: string } },
) {
  try {
    const data = await req.formData();
    const { barcode } = await params;

    console.log("line 32 -> ", data);

    const name = data.get("name") as string;
    const stock = Number(data.get("stock"));
    const purchaseprice = Number(data.get("purchaseprice"));
    const sellingprice = Number(data.get("sellingprice"));
    const unit = data.get("unit") as string;
    const picture = data.get("picture") as File | null;

    let imageUrl = null;

    if (picture && picture.size > 0) {
      const bytes = await picture.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      const mime = picture.type;
      const base64Image = `data:${mime};base64,${base64}`;

      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "pos-db",
      });

      imageUrl = result.secure_url;
    }

    try {
      const res = await prisma.goods.update({
        where: { barcode },
        data: {
          barcode,
          name,
          stock,
          purchaseprice,
          sellingprice,
          unit,
          picture: typeof picture === "string" ? picture : imageUrl,
        },
      });
      console.log("res nya ini bro -> ", res);

      return NextResponse.json(res);
    } catch (err) {
      console.error("Error update goods:", err);
      return NextResponse.json(
        { error: "Failed to update goods" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.log("error when update units : ", error);
    return NextResponse.json("failed to put goods");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { barcode: string } },
) {
  const { barcode } = await params;
  console.log("ini barcode nya => ", barcode);
  try {
    if (!barcode) {
      return NextResponse.json(
        { error: "barcode is required in the URL." },
        { status: 400 },
      );
    }

    const res = await prisma.goods.delete({
      where: { barcode },
    });
    console.log("kehapus ga ini => ", res);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error when delete goods : ", error);
    return NextResponse.json("failed to delete goods");
  }
}
