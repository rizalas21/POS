export interface Goods {
  barcode: string;
  name: string;
  stock: number;
  purchaseprice: number;
  sellingprice: number;
  unit: string;
  picture: string | null;
}

export type GoodsParams = {
  keyword: string;
  limit: number;
  page: number;
  sortBy: string;
  sort: "asc" | "desc";
};

export interface goodsState {
  goods: Goods[];
  page: Number;
  pages: Number;
  total: Number;
  getGoods: (params: GoodsParams) => void;
  addGoods: (data: FormData) => void;
  deleteGoods: (barcode: string) => void;
  updateGoods: (barcode: string, data: FormData) => void;
}
