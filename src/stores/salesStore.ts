import { SalesState } from "@/app/types/sales";
import axios from "axios";
import { create } from "zustand";

export const useSalesStore = create<SalesState>((set) => ({
  sales: [],
  page: 1,
  pages: 1,
  total: 1,
  getSales: async (params) => {
    try {
      const { data } = await axios.get("/api/sales", { params });
      if (data.status >= 400) return null;
      set({
        sales: data.data,
        page: data.page,
        pages: data.pages,
        total: data.total,
      });
    } catch (error) {
      console.error("Error fetching sales: ", error);
      return null;
    }
  },
  addSales: async (data) => {
    try {
      console.log("data nya: ", data);
      const res = await axios.post("/api/sales", data);
      if (!res || res.status >= 400) return null;
      set((state) => ({ sales: [res.data, ...state.sales] }));
    } catch (error) {
      console.error("Error adding data: ", error);
      return null;
    }
  },
  deleteSales: async (invoice) => {
    try {
      await axios.delete(`/api/sales/inv/${invoice}`);
      const res = await axios.delete(`/api/sales/${invoice}`);
      if (!res || res.status >= 400) return null;
      set((state) => ({
        sales: state.sales.filter((item) => item.invoice !== invoice),
        total: Number(state.total) - 1,
      }));
    } catch (error) {
      console.error("Error delete sales: ", error);
      return null;
    }
  },
  updateSales: async (invoice, data) => {
    try {
      console.log("data update purchase: ", data);
      const res = await axios.put(`/api/sales/${invoice}`, data);
      if (!res || res.status >= 400) return null;

      set((state) => ({
        sales: state.sales.map((item) =>
          item.invoice === invoice ? res.data : item
        ),
      }));
    } catch (error) {
      console.error("Error update sales: ", error);
      return null;
    }
  },
}));
