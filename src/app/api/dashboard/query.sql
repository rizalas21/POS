-- SALES
SELECT 
  DATE_TRUNC('month', "createdAt") AS month_date,
  TO_CHAR(DATE_TRUNC('month', "createdAt"), 'MM-YYYY') AS month,
  SUM("totalsum")::numeric AS "totalSales"

FROM "Sales"
GROUP BY DATE_TRUNC('month', "createdAt")
ORDER BY month_date


-- PURCHASES
SELECT 
  DATE_TRUNC('month', "createdAt") AS month_date,
  TO_CHAR(DATE_TRUNC('month', "createdAt"), 'MM-YYYY') AS month,
  SUM("totalsum")::numeric AS "expense"

FROM "Purchases"
GROUP BY DATE_TRUNC('month', "createdAt")
ORDER BY month_date

-------------------------------------------------------------------
-------------------------------------------------------------------

WITH sales AS (
    SELECT 
  DATE_TRUNC('month', "createdAt") AS month_date,
  TO_CHAR(DATE_TRUNC('month', "createdAt"), 'MM-YYYY') AS month,
  SUM("totalsum")::numeric AS "totalSales"

FROM "Sales"
WHERE
    ($1::timestamp IS NULL OR "createdAt" >= $1)
    OR
    ($2::timestamp IS NULL OR "createdAt" <= $2)
GROUP BY DATE_TRUNC('month', "createdAt")
),
expense AS (
    SELECT 
  DATE_TRUNC('month', "createdAt") AS month_date,
  TO_CHAR(DATE_TRUNC('month', "createdAt"), 'MM-YYYY') AS month,
  SUM("totalsum")::numeric AS "expense"

FROM "Purchases"
WHERE
    ($1::timestamp IS NULL OR "createdAt" >= $1)
    OR
    ($2::timestamp IS NULL OR "createdAt" <= $2)
GROUP BY DATE_TRUNC('month', "createdAt")
)
SELECT 
  TO_CHAR(COALESCE(s.month_date, e.month_date), 'MM-YYYY') AS month,
  COALESCE(e."expense", 0) AS "expense",
  COALESCE(s."totalSales", 0) AS "revenue",
  COALESCE(s."totalSales", 0) - COALESCE(e."expense", 0) AS "earning"

FROM sales s
FULL OUTER JOIN expense e
    ON s.month_date = e.month_date
ORDER BY month