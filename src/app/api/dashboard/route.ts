import { prisma } from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = await req.nextUrl;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const keyword = searchParams.get("keyword");
    const sort = searchParams.get("sort");
    const sortBy = searchParams.get("sortBy");
    let page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));
    const totalSales = await prisma.sales.count();
    const purchases = await prisma.purchases.aggregate({
      _sum: { totalsum: true },
    });
    const sales = await prisma.sales.aggregate({
      _sum: { totalsum: true },
    });
    const directRevenue = await prisma.sales.aggregate({
      _sum: { totalsum: true },
      where: {
        customer: 3,
      },
    });
    const customerRevenue = await prisma.sales.aggregate({
      _sum: { totalsum: true },
      where: {
        customer: { not: 3 },
      },
    });
    const cards = {
      purchases: Number(purchases._sum.totalsum),
      sales: Number(sales._sum.totalsum),
      earnings: Number(sales._sum.totalsum) - Number(purchases._sum.totalsum),
      totalSales,
    };
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const handleSort =
      sortBy === "month" ? "COALESCE(s.month_date, e.month_date)" : sortBy;

    const totalResult: any = await prisma.$queryRawUnsafe(
      `
    WITH sales AS(
    SELECT
    DATE_TRUNC('month', "createdAt") AS month_date,
    TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon YY') AS month,
    SUM("totalsum")::numeric AS "totalSales"

    FROM "Sales"
    WHERE
    ($1::timestamp IS NULL OR "createdAt" >= $1)
    AND
    ($2::timestamp IS NULL OR "createdAt" <= $2)
    GROUP BY DATE_TRUNC('month', "createdAt")
    ),
    expense AS(
    SELECT
    DATE_TRUNC('month', "createdAt") AS month_date,
    TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon YY') AS month,
    SUM("totalsum")::numeric AS "expense"

    FROM "Purchases"
    WHERE
    ($1::timestamp IS NULL OR "createdAt" >= $1)
    AND
    ($2::timestamp IS NULL OR "createdAt" <= $2)
    GROUP BY DATE_TRUNC('month', "createdAt")
    )

    SELECT COUNT(*) AS total
    FROM(
    SELECT
    TO_CHAR(COALESCE(s.month_date, e.month_date), 'Mon YY') AS month

    FROM sales s
    FULL OUTER JOIN expense e
    ON s.month_date = e.month_date

    WHERE
($3::text IS NULL
 OR $3 = ''
 OR TO_CHAR(COALESCE(s.month_date, e.month_date),'Mon YY') ILIKE '%' || $3 || '%'
 OR COALESCE(e."expense", 0)::text ILIKE $3 || '%'
 OR COALESCE(s."totalSales", 0)::text ILIKE $3 || '%'
 OR (COALESCE(s."totalSales", 0) - COALESCE(e."expense", 0))::text ILIKE $3 || '%'
 )
)
`,
      start,
      end,
      keyword,
      limit,
    );

    const total = Number(totalResult[0].total);
    const pages = Math.ceil(total / limit);

    if (Number(totalResult[0].total) === 1 && pages === 1) {
      page = 1;
    }

    const offset = (Number(page) - 1) * limit;

    const dataTable: Array<Object> = await prisma.$queryRawUnsafe(
      `
      WITH sales AS (
SELECT 
DATE_TRUNC('month', "createdAt") AS month_date,
TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon YY') AS month,
SUM("totalsum")::numeric AS "totalSales"

FROM "Sales"
WHERE
    ($1::timestamp IS NULL OR "createdAt" >= $1)
AND
    ($2::timestamp IS NULL OR "createdAt" <= $2)
    GROUP BY DATE_TRUNC('month', "createdAt")
),
expense AS (
SELECT 
DATE_TRUNC('month', "createdAt") AS month_date,
TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon YY') AS month,
SUM("totalsum")::numeric AS "expense"

FROM "Purchases"
WHERE
($1::timestamp IS NULL OR "createdAt" >= $1)
AND
    ($2::timestamp IS NULL OR "createdAt" <= $2)
    GROUP BY DATE_TRUNC('month', "createdAt")
)
SELECT 
TO_CHAR(COALESCE(s.month_date, e.month_date), 'Mon YY') AS month,
COALESCE(e."expense", 0) AS "expense",
COALESCE(s."totalSales", 0) AS "revenue",
COALESCE(s."totalSales", 0) - COALESCE(e."expense", 0) AS "earning"

FROM sales s
FULL OUTER JOIN expense e
ON s.month_date = e.month_date

WHERE
($3::text IS NULL
 OR $3 = ''
 OR TO_CHAR(COALESCE(s.month_date, e.month_date),'Mon YY') ILIKE '%' || $3 || '%'
 OR COALESCE(e."expense", 0)::text ILIKE $3 || '%'
 OR COALESCE(s."totalSales", 0)::text ILIKE $3 || '%'
 OR (COALESCE(s."totalSales", 0) - COALESCE(e."expense", 0))::text ILIKE $3 || '%'
 )
 ORDER BY ${handleSort} ${sort}
 LIMIT COALESCE($4::int, 12)
 OFFSET COALESCE($5::int, 3)
 `,
      start,
      end,
      keyword,
      limit,
      offset,
    );

    const data = {
      cards,
      dataTable,
      customerRevenue: {
        label: "Customer",
        value: Number(customerRevenue._sum.totalsum),
      },
      directRevenue: {
        label: "Direct",
        value: Number(directRevenue._sum.totalsum),
      },
      page,
      pages,
      total,
    };
    return NextResponse.json(data);
  } catch (error) {
    console.log("error when get dashboard: ", error);
    return NextResponse.json(error);
  }
}
// WITH sales AS (
//     SELECT
//       DATE_TRUNC('month', "createdAt") AS month_date,
//       TO_CHAR(DATE_TRUNC('month', "createdAt"), 'YYYY-MM') AS month,
//       SUM("totalsum")::numeric AS "totalSales",
//       COUNT(*)::numeric AS "totalTransactions"
//     FROM "Sales"
//     WHERE
//       ($1::timestamp IS NULL OR "createdAt" >= $1)
//       AND
//       ($2::timestamp IS NULL OR "createdAt" <= $2)
//     GROUP BY month_date
//   ),
//   expenses AS (
//     SELECT
//       DATE_TRUNC('month', "createdAt") AS month_date,
//       TO_CHAR(DATE_TRUNC('month', "createdAt"), 'YYYY-MM') AS month,
//       SUM("totalsum")::numeric AS "expense"
//     FROM "Purchases"
//     WHERE
//       ($1::timestamp IS NULL OR "createdAt" >= $1)
//       AND
//       ($2::timestamp IS NULL OR "createdAt" <= $2)
//     GROUP BY month_date
//   )

//   SELECT
//     TO_CHAR(COALESCE(s.month_date, e.month_date), 'YYYY-MM') AS month,
//     COALESCE(s."totalSales", 0) AS "totalSales",
//     COALESCE(s."totalTransactions", 0) AS "totalTransactions",
//     COALESCE(e."expense", 0) AS "expense",
//     COALESCE(s."totalSales", 0) - COALESCE(e."expense", 0) AS "earning"
//   FROM sales s
//   FULL OUTER JOIN expenses e
//     ON s.month_date = e.month_date
//   ORDER BY month ASC
