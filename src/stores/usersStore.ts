import axios from "axios";
import { create } from "zustand";

export interface Users {
  userid: string;
  email: string;
  name: string;
  role: string;
}

interface usersState {
  users: Users[];
  getUsers: () => void;
  addUsers: (data: Omit<Users, "userid">) => void;
  deleteUsers: (userid: string) => void;
  updateUsers: (userid: string, data: Omit<Users, "userid">) => void;
}

export const useUsersStore = create<usersState>((set) => ({
  users: [],
  getUsers: async () => {
    try {
      const data = await axios.get("/api/users");
      if (data.status >= 400 || !Array.isArray(data?.data)) return null;
      set({ users: data.data });
    } catch (error) {
      console.error("Error fetching budgets:", error);
      return null;
    }
  },
  addUsers: async (data) => {
    try {
      console.log("data add users store => ", data);
      const res = await axios.post("/api/users", { data });
      if (res.status >= 400) {
        return null;
      }
      console.log("res nya ini bro => ", res);
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
      console.log("ini res store nya => ", res);
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
