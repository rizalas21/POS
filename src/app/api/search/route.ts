import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const keyword = await req.nextUrl.searchParams.get("keyword") || ""

        const goods = await prisma.goods.findMany({where: {OR: [{name: {contains: keyword, mode: "insensitive"}}]}})
    } catch (error) {
        return NextResponse.json(error)
    }
}