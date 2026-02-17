import { SuppliersState } from "@/app/types/suppliers";
import axios from "axios";
import { create } from "zustand";

export const useSuppliersStore = create<SuppliersState>((set) => ({
  suppliers: [],
  page: 1,
  pages: 1,
  total: 1,
  getSuppliers: async (params) => {
    try {
      const { data } = await axios.get("/api/suppliers", { params });
      if (data.status >= 400 || !Array.isArray(data?.data)) return null;
      set({
        suppliers: data.data,
        page: data.page,
        pages: data.pages,
        total: data.total,
      });
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      return null;
    }
  },
  addSuppliers: async (data) => {
    try {
      const res = await axios.post("/api/suppliers", data);
      if (res.status >= 400) {
        return null;
      }
      set((state) => ({ suppliers: [res.data, ...state.suppliers] }));
    } catch (error) {
      console.error("Error adding suppliers:", error);
      return null;
    }
  },
  deleteSuppliers: async (supplierid) => {
    try {
      const res = await axios.delete(`/api/suppliers/${supplierid}`);
      console.log("masuk res store -> ", res.data);
      if (res.status >= 400) {
        return { success: false, message: "Unknown Error" };
      }

      set((state) => ({
        suppliers: state.suppliers.filter(
          (item) => item.supplierid !== Number(supplierid),
        ),
        total: Number(state.total) - 1,
      }));
      return { success: true, message: "Deleted Supplier Success" };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          message:
            error.response?.data?.message ||
            error.response?.data ||
            "Terjadi kesalahan",
        };
      }
      return {
        success: false,
        message: "Unknown error",
      };
    }
  },
  updateSuppliers: async (supplierid, data) => {
    try {
      const res = await axios.put(`/api/suppliers/${supplierid}`, data);
      if (res.status >= 400) return null;
      set((state) => ({
        suppliers: state.suppliers.map((item) =>
          item.supplierid === Number(supplierid) ? res.data : item,
        ),
      }));
    } catch (error) {
      console.log("error when updating suppliers: ", error);
      return null;
    }
  },
}));
