import { dashboardState } from "@/app/types/dashboard";
import axios from "axios";
import { create } from "zustand";

export const useDashboardStore = create<dashboardState>((set) => ({
  dashboard: {
    cards: {
      purchases: 0,
      sales: 0,
      earnings: 0,
      totalSales: 0,
    },
    dataTable: [],
    customerRevenue: { label: "", value: 0 },
    directRevenue: { label: "", value: 0 },
  },
  page: 1,
  pages: 1,
  total: 1,
  getDashboard: async (params) => {
    try {
      const { data } = await axios.get("/api/dashboard", { params });
      if (data.status >= 400) return null;
      set({
        dashboard: data.data,
        page: data.page,
        pages: data.pages,
        total: data.total,
      });
    } catch (error) {
      console.error("Error fetching customers: ", error);
      return null;
    }
  },
}));
