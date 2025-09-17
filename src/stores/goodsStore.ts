import { goodsState } from "@/app/types/goods";
import axios from "axios";
import { create } from "zustand";

export const useGoodsStore = create<goodsState>((set) => ({
  goods: [],
  page: 1,
  pages: 1,
  total: 1,
  getGoods: async (params) => {
    try {
      const { data } = await axios.get("/api/goods", { params });
      console.log("ini data store nya => ", data);
      if (data.status >= 400 || !Array.isArray(data?.data)) return null;
      set({
        goods: data.data,
        page: data.page,
        pages: data.pages,
        total: data.total,
      });
    } catch (error) {
      console.error("Error fetching goods:", error);
      return null;
    }
  },
  addGoods: async (data) => {
    try {
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
        totat: Number(state.total) - 1,
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
