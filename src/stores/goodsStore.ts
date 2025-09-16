import axios from "axios";
import { create } from "zustand";

export interface Goods {
  barcode: string;
  name: string;
  stock: number;
  purchasePrice: number;
  sellingPrice: number;
  unit: string;
  picture: string | null;
}

interface searchParams {
  keyword: string;
  sortBy: string;
  sort: string;
  page: string;
  limit: string;
}

interface goodsState {
  goods: Goods[];
  page: Number;
  pages: Number;
  total: Number;
  getGoods: (params: searchParams) => void;
  addGoods: (data: FormData) => void;
  deleteGoods: (barcode: string) => void;
  updateGoods: (barcode: string, data: Goods) => void;
}

export const useGoodsStore = create<goodsState>((set) => ({
  goods: [],
  page: 1,
  pages: 1,
  total: 1,
  getGoods: async (params) => {
    try {
      const { data } = await axios.get("/api/goods", { params });
      if (data.status >= 400 || !Array.isArray(data?.data)) return null;
      set({ goods: data.data });
    } catch (error) {
      console.error("Error fetching goods:", error);
      return null;
    }
  },
  addGoods: async (data) => {
    try {
      console.log("ini adata bro => ", data);
      const res = await axios.post("/api/goods", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status >= 400) {
        return null;
      }
      set((state) => ({ goods: [res.data, ...state.goods] }));
    } catch (error) {
      console.error("Error adding goods:", error);
      return null;
    }
  },
  deleteGoods: async (barcode) => {
    try {
      const res = await axios.delete(`/api/goods/${barcode}`);
      if (res.status >= 400) {
        return null;
      }
      set((state) => ({
        goods: state.goods.filter((item) => item.barcode !== barcode),
      }));
    } catch (error) {
      console.error("Error deleting goods:", error);
      return null;
    }
  },
  updateGoods: async (barcode, data) => {
    try {
      const res = await axios.put(`/api/goods/${barcode}`, data);
      if (res.status >= 400) {
        return null;
      }
      set((state) => ({
        goods: state.goods.map((item) =>
          item.barcode === barcode ? res.data : item
        ),
      }));
    } catch (error) {
      console.error("Error updating goods:", error);
      return null;
    }
  },
}));
