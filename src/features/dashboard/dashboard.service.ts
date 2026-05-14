import { queryChart, queryTotal } from "@/app/api/dashboard/query";
import { prisma } from "@/app/prisma";

export async function getDashboard(params: any) {
  const { startDate, endDate, keyword, sort, sortBy, limit } = params;
  let { page } = params;
  const safeSort = sort?.toLowerCase() === "desc" ? "DESC" : "ASC";

  const start = startDate ? new Date(startDate) : undefined;
  const end = endDate ? new Date(endDate) : undefined;

  const totalSales = await prisma.sales.count({
    where: {
      createdAt: { gte: start, lte: end },
    },
  });
  const purchases = await prisma.purchases.aggregate({
    _sum: { totalsum: true },
    where: {
      createdAt: { gte: start, lte: end },
    },
  });
  const sales = await prisma.sales.aggregate({
    _sum: { totalsum: true },
    where: {
      createdAt: { gte: start, lte: end },
    },
  });
  const directRevenue = await prisma.sales.aggregate({
    _sum: { totalsum: true },
    where: {
      customer: 3,
      createdAt: { gte: start, lte: end },
    },
  });
  const customerRevenue = await prisma.sales.aggregate({
    _sum: { totalsum: true },
    where: {
      customer: { not: 3 },
      createdAt: { gte: start, lte: end },
    },
  });
  const cards = {
    purchases: Number(purchases._sum.totalsum),
    sales: Number(sales._sum.totalsum),
    earnings: Number(sales._sum.totalsum) - Number(purchases._sum.totalsum),
    totalSales,
  };

  const handleSort =
    sortBy === "month" ? "COALESCE(s.month_date, e.month_date)" : sortBy;

  const totalResult: any = await prisma.$queryRawUnsafe(
    queryTotal,
    start,
    end,
    keyword,
    limit,
  );

  const total = Number(totalResult[0].total);
  const pages = Math.ceil(total / Number(limit));

  if (Number(totalResult[0].total) === 1 && pages === 1) {
    page = 1;
  }

  const offset = (Number(page) - 1) * limit;

  const dataTable: Array<Object> = await prisma.$queryRawUnsafe(
    `WITH sales AS (
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
     ORDER BY ${handleSort} ${safeSort}
     LIMIT COALESCE($4::int, 12)
     OFFSET COALESCE($5::int, 3)`,
    start,
    end,
    keyword,
    limit,
    offset,
  );

  const chartData = (await prisma.$queryRawUnsafe(
    queryChart,
    start,
    end,
  )) as any[];

  const formattedChartData = chartData.map((item: any) => ({
    ...item,
    expense: Number(item.expense),
    revenue: Number(item.revenue),
    earning: Number(item.earning),
  }));

  const data = {
    chartData: formattedChartData,
    cards,
    dataTable: dataTable.map((item: any) => ({
      ...item,
      expense: Number(item.expense),
      revenue: Number(item.revenue),
      earning: Number(item.earning),
    })),
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
  console.log(data);
  return data;
}
