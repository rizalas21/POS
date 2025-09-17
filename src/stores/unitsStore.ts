import { unitState } from "@/app/types/units";
import axios from "axios";
import { create } from "zustand";

export const useUnitsStore = create<unitState>((set) => ({
  units: [],
  page: 1,
  pages: 1,
  total: 1,
  getUnits: async (params) => {
    try {
      const { data } = await axios.get("/api/units", { params });
      if (data.status >= 400 || !Array.isArray(data?.data)) return null;
      set({
        units: data.data,
        page: data.page,
        pages: data.pages,
        total: data.total,
      });
    } catch (error) {
      console.error("Error fetching unit:", error);
      return null;
    }
  },
  addUnits: async (data) => {
    try {
      const res = await axios.post("/api/units", data);
      if (res.status >= 400) {
        return null;
      }
      set((state) => ({ units: [res.data, ...state.units] }));
    } catch (error) {
      console.error("Error adding unit:", error);
      return null;
    }
  },
  deleteUnits: async (unit) => {
    try {
      const res = await axios.delete(`/api/units/${unit}`);
      if (res.status >= 400) {
        return null;
      }
      console.log("res backend => ", res);
      set((state) => ({
        units: state.units.filter((item) => item.unit !== unit),
      }));
    } catch (error) {
      console.error("Error deleting unit:", error);
      return null;
    }
  },
  updateUnits: async (unit, data) => {
    try {
      const res = await axios.put(`/api/units/${unit}`, data);
      if (res.status >= 400) {
        return null;
      }
      console.log("response back end bro => ", res);
      set((state) => ({
        units: state.units.map((item) =>
          item.unit === unit ? res.data : item
        ),
      }));
    } catch (error) {
      console.error("Error updating unit:", error);
      return null;
    }
  },
}));
