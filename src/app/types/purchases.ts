export interface Purchases {
  invoice: string;
  time: Date;
  totalsum: number;
  supplier: number;
  operator: string;
}

export interface SearchParams {
  keyword: string;
  sortBy: string;
  sort: string;
  page: string;
  limit: string;
}

export interface Item {
  invoice: string;
  itemcode: string;
  quantity: number;
  purchaseprice: number;
  totalprice: number;
}

export interface PurchasesState {
  purchases: Purchases[];
  page: Number;
  pages: Number;
  total: Number;
  getPurchases: (params: SearchParams) => void;
  addPurchases: (data: Purchases, item: Item) => void;
  deletePurchases: (barcode: string) => void;
  updatePurchases: (barcode: string, data: Purchases) => void;
}
