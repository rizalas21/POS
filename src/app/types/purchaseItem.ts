export interface PurchaseItem {
  invoice: string;
  itemcode: string;
  name?: string;
  quantity: number;
  purchaseprice: number;
  totalprice: number;
}
