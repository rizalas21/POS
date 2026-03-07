export interface searchParams {
  keyword: string;
  sortBy: string;
  sort: string;
  page: string;
  limit: string;
}

export interface Dashboard {
  cards: {
    purchases: number;
    sales: number;
    earnings: number;
    totalSales: number;
  };
  dataTable: [];
  customerRevenue: { label: string; value: number };
  directRevenue: { label: string; value: number };
}

export interface dashboardState {
  dashboard: Dashboard;
  page: number;
  pages: number;
  total: number;
  getDashboard: (params: searchParams) => void;
}
