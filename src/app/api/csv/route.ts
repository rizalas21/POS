import { NextRequest, NextResponse } from "next/server";
import { Parser } from "json2csv";
import { prisma } from "@/app/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = await req.nextUrl;
  const fields = ["month", "expense", "revenue", "earning"];
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const keyword = searchParams.get("keyword");
  const limit = Number(searchParams.get("limit"));
  const sort = searchParams.get("sort");
  const sortBy = searchParams.get("sortBy");
  let page = Number(searchParams.get("page"));

  const handleSort =
    sortBy === "month" ? "COALESCE(s.month_date, e.month_date)" : sortBy;

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  const offset = (Number(page) - 1) * limit;
  const data: Array<Object> = await prisma.$queryRawUnsafe(
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

  try {
    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=sales.csv",
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "CSV generation failed" },
      { status: 500 },
    );
  }
}

// dataTable
// :
// Array(3)
// 0
// :
// {month: 'Jan 26', expense: '0', revenue: '5000', earning: '5000'}
// 1
// :
// {month: 'Feb 26', expense: '50000', revenue: '44000', earning: '-6000'}
// 2
// :
// {month: 'Mar 26', expense: '0', revenue: '96000', earning: '96000'}
