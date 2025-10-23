export interface Goods {
  barcode: string;
  name: string;
  stock: number;
  purchaseprice: number;
  sellingprice: number;
  unit: string;
  picture: string | null;
}

export interface searchParams {
  keyword: string;
  sortBy: string;
  sort: string;
  page: string;
  limit: string;
}

export interface goodsState {
  goods: Goods[];
  page: Number;
  pages: Number;
  total: Number;
  getGoods: (params: searchParams) => void;
  addGoods: (data: FormData) => void;
  deleteGoods: (barcode: string) => void;
  updateGoods: (barcode: string, data: FormData) => void;
}
