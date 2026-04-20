import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const keyword = await req.nextUrl.searchParams.get("keyword") || ""

        const good = await prisma.goods.findMany({where: {OR: [{name: {contains: keyword, mode: "insensitive"}}, {barcode: {contains:keyword, mode: "insensitive"}}]}, take: 3})
        const customer = await prisma.customers.findMany({where: {OR: [{name: {contains: keyword, mode: "insensitive"}}, {phone: {contains:keyword, mode: "insensitive"}}]}, take: 3})
        const sale = await prisma.sales.findMany({where: {invoice: {contains: keyword, mode: "insensitive"}}, take: 3})

        return NextResponse.json( {goods: {name: "goods", item: good}, customers: {name: "customers", item: customer}, sale: {name: "sales", item: sale}})
    } catch (error) {
        return NextResponse.json(error)
    }
}