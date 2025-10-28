export interface Sales {
  invoice: string;
  time: Date;
  totalsum: number;
  pay: number;
  change: number;
  customers?: { customerid: number; name: string };
  operator: string;
  saleItems?: Item[];
}

export interface SearchParams {
  keyword: string;
  sortBy: string;
  sort: string;
  page: string;
  limit: string;
}

export interface Item {
  id?: string;
  invoice: string;
  itemcode: string;
  quantity: number;
  sellingprice: number;
  totalprice: number;
}

export interface SalesState {
  sales: Sales[];
  page: Number;
  pages: Number;
  total: Number;
  getSales: (params: SearchParams) => void;
  addSales: (data: Sales, item: Item[]) => void;
  deleteSales: (invoice: string) => void;
  updateSales: (invoice: string, data: Sales) => void;
}
