export const queryDataTable = `WITH sales AS (
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
 ORDER BY $4 $5
 LIMIT COALESCE($6::int, 12)
 OFFSET COALESCE($7::int, 3)`;

export const queryChart = `WITH sales AS (
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
 `;

export const queryTotal = `
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
 `;
