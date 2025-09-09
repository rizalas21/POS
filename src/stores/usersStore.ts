import axios from "axios";
import { create } from "zustand";

export interface Users {
  userid: string;
  email: string;
  name: string;
  role: string;
}

export interface SearchUsers {
  keyword: string;
  sortBy: string;
  sort: string;
  page: string;
  limit: string;
}

interface usersState {
  users: Users[];
  page: Number;
  pages: Number;
  total: Number;
  getUsers: (params: SearchUsers) => void;
  addUsers: (data: Omit<Users, "userid">) => void;
  deleteUsers: (userid: string) => void;
  updateUsers: (userid: string, data: Omit<Users, "userid">) => void;
}

export const useUsersStore = create<usersState>((set) => ({
  users: [],
  page: 1,
  pages: 1,
  total: 2,
  getUsers: async (params) => {
    try {
      const { data } = await axios.get("/api/users", { params });
      console.log("data ini bro => ", data);
      if (data.status >= 400 || !Array.isArray(data?.data)) return null;
      set({
        users: data.data,
        page: data.page,
        pages: data.pages,
        total: data.total,
      });
    } catch (error) {
      console.error("Error fetching budgets:", error);
      return null;
    }
  },
  addUsers: async (data) => {
    try {
      const res = await axios.post("/api/users", { data });
      if (res.status >= 400) {
        return null;
      }
      set((state) => ({ users: [res.data, ...state.users] }));
    } catch (error) {
      console.error("Error adding budget:", error);
      return null;
    }
  },
  deleteUsers: async (userid) => {
    try {
      const res = await axios.delete(`/api/users/${userid}`);
      if (res.status >= 400) {
        return null;
      }
      set((state) => ({
        users: state.users.filter((item) => item.userid !== userid),
      }));
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  },
  updateUsers: async (userid, data) => {
    try {
      const res = await axios.put(`/api/users/${userid}`, { data });
      set((state) => ({
        users: state.users.map((item) =>
          item.userid === userid ? res.data : item
        ),
      }));
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  },
}));
