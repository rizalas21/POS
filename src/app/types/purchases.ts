export interface Purchases {
  invoice: string;
  time: Date;
  totalsum: number;
  suppliers?: { supplierid: number; name: string };
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
  id?: string;
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
  addPurchases: (data: Purchases, item: Item[]) => void;
  deletePurchases: (invoice: string) => void;
  updatePurchases: (invoice: string, data: Purchases, items: Item[]) => void;
}
