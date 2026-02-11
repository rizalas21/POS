import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = await req.nextUrl;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const sort = searchParams.get("sort");
    const sortBy = searchParams.get("sortBy");
    const totalSales = await prisma.sales.count();
    const purchases = await prisma.purchases.aggregate({
      _sum: { totalsum: true },
    });
    const sales = await prisma.sales.aggregate({
      _sum: { totalsum: true },
    });
    const cards = {
      purchases: Number(purchases._sum.totalsum),
      sales: Number(sales._sum.totalsum),
      earnings: Number(sales._sum.totalsum) - Number(purchases._sum.totalsum),
      totalSales,
    };
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const datasale = await prisma.$queryRawUnsafe(
      `
      SELECT
      TO_CHAR(DATE_TRUNC('month', "createdAt"), 'YYYY-MM') AS month,
      SUM("totalsum")::numeric AS "totalSales",
      COUNT(*)::numeric AS "totalTransactions" 
      FROM "Sales"
      WHERE 
      ($1::timestamp IS NULL OR "createdAt" >= $1)
      AND
      ($2::timestamp IS NULL OR "createdAt" >= $2)
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY DATE_TRUNC('month', "createdAt") ASC
  `,
      start,
      end
    );

    console.log("data sale bro: ", datasale);

    const data = {
      cards,
    };
    return NextResponse.json(data);
  } catch (error) {
    console.log("error when get dashboard: ", error);
    return NextResponse.json(error);
  }
}
