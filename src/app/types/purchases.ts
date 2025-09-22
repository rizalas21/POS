import { DateTime } from "next-auth/providers/kakao";

export interface Purchases {
  invoice: string;
  time: DateTime;
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

export interface PurchasesState {
  purchases: Purchases[];
  page: Number;
  pages: Number;
  total: Number;
  getPurchases: (params: SearchParams) => void;
  addPurchases: (data: Purchases) => void;
  deletePurchases: (barcode: string) => void;
  updatePurchases: (barcode: string, data: FormData) => void;
}
