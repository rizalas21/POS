import { PurchasesState } from "@/app/types/purchases";
import axios from "axios";
import { create } from "zustand";

export const usePurchasesStore = create<PurchasesState>((set) => ({
  purchases: [],
  page: 1,
  pages: 1,
  total: 1,
  getPurchases: async (params) => {
    try {
      const { data } = await axios.get("/api/purchases", { params });
      if (data.status >= 400) return null;
      set({
        purchases: data.data,
        page: data.page,
        pages: data.pages,
        total: data.total,
      });
    } catch (error) {
      console.error("Error fetching purchases: ", error);
      return null;
    }
  },
  addPurchases: async (data) => {
    try {
      const res = await axios.post("/api/purchases", data);
      if (!res || res.status >= 400) return null;
      set((state) => ({ purchases: [res.data, ...state.purchases] }));
    } catch (error) {
      console.error("Error adding data: ", error);
      return null;
    }
  },
  deletePurchases: async (invoice) => {
    try {
      const res = await axios.delete(`/api/purchases/${invoice}`);
      if (!res || res.status >= 400) return null;
      set((state) => ({
        purchases: state.purchases.filter((item) => item.invoice !== invoice),
      }));
    } catch (error) {
      console.error("Error delete purchases: ", error);
      return null;
    }
  },
  updatePurchases: async (invoice, data) => {
    try {
      const res = await axios.put(`/api/purchases/${invoice}`, data);
      if (!res || res.status >= 400) return null;
      set((state) => ({
        purchases: state.purchases.map((item) =>
          item.invoice === invoice ? res.data : item
        ),
      }));
    } catch (error) {
      console.error("Error update purchases: ", error);
      return null;
    }
  },
}));
