import { create } from "zustand";
import { DashboardResponse, SearchParams } from "@/types/dashboard";
import { getDashboard } from "@/services/dashboard.service";

type DashboardState = {
  dashboard: DashboardResponse | null;

  params: SearchParams;

  setParams: (params: Partial<SearchParams>) => void;

  fetchDashboard: (params: SearchParams) => Promise<void>;
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
  dashboard: null,

  params: {
    keyword: "",
    page: 1,
    limit: 3,
    sortBy: "month",
    sort: "asc",
    startDate: "2020-01-01",
    endDate: new Date().toISOString().slice(0, 10),
  },

  setParams: (params) =>
    set((state) => ({
      params: { ...state.params, ...params },
    })),

  fetchDashboard: async () => {
    const { params } = get();

    const data = await getDashboard(params);

    set({ dashboard: data });
  },
}));
