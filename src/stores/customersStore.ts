import { customersState } from "@/app/types/customers";
import axios from "axios";
import { create } from "zustand";

export const useCustomersStore = create<customersState>((set) => ({
  customers: [],
  page: 1,
  pages: 1,
  total: 1,
  getCustomers: async (params) => {
    try {
      const { data } = await axios.get("/api/customers", { params });
      if (data.status >= 400) return null;
      set({
        customers: data.data,
        page: data.page,
        pages: data.pages,
        total: data.total,
      });
    } catch (error) {
      console.error("Error fetching customers: ", error);
      return null;
    }
  },
  addCustomers: async (data) => {
    try {
      const res = await axios.post("/api/customers", data);
      if (!res || res.status >= 400) return null;
      set((state) => ({ customers: [res.data, ...state.customers] }));
    } catch (error) {
      console.error("Error post customers", error);
      return null;
    }
  },
  deleteCustomers: async (customerid) => {
    try {
      const res = await axios.delete(`/api/customers/${customerid}`);
      if (!res || res.status >= 400) return null;
      set((state) => ({
        customers: state.customers.filter(
          (item) => item.customerid !== Number(customerid)
        ),
        total: Number(state.total) - 1,
      }));
    } catch (error) {
      console.error("Error delete customers: ", error);
      return null;
    }
  },
  updateCustomers: async (customerid, data) => {
    try {
      const res = await axios.put(`/api/customers/${customerid}`, data);
      if (!res || res.status >= 400) return null;
      set((state) => ({
        customers: state.customers.map((item) =>
          item.customerid === Number(customerid) ? res.data : item
        ),
      }));
    } catch (error) {
      console.error("Error update Customers: ", error);
      return null;
    }
  },
}));
