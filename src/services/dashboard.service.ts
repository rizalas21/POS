import axios from "axios";
import { SearchParams, DashboardResponse } from "@/types/dashboard";

export const getDashboard = async (
  params: SearchParams,
): Promise<DashboardResponse> => {
  const { data } = await axios.get("/api/dashboard", { params });

  return data;
};
