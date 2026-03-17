export interface SearchParams {
  keyword: string;
  limit: number;
  page: number;
  sortBy: string;
  sort: "asc" | "desc";
  startDate?: string;
  endDate?: string;
}

export type Cards = {
  earnings: number;
  purchases: number;
  sales: number;
  totalSales: number;
};

export type MonthlyData = {
  month: string;
  expense: number;
  revenue: number;
  earning: number;
};

export type RevenueSource = {
  label: string;
  value: number;
};

export type DashboardResponse = {
  cards: Cards;
  dataTable: MonthlyData[];
  chartData: MonthlyData[];
  customerRevenue: RevenueSource;
  directRevenue: RevenueSource;
  pages: number;
  total: number;
  params: SearchParams;
};
