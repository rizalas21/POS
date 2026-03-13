"use client";
import { useEffect, useState } from "react";
import { useDashboardStore } from "@/stores/dashboard.store";
import { SearchParams } from "@/types/dashboard";

export default function useDashboard() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const lastDate = String(
    new Date(year, today.getMonth() + 1, 0).getDate(),
  ).padStart(2, "0");

  const { dashboard, fetchDashboard, params, setParams } = useDashboardStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams({
      [name]: name === "limit" || name === "page" ? Number(value) : value,
      page: 1,
    });
  };

  const handleSort = (e: any) => {
    const { name, value } = e.currentTarget;

    setParams({ ...params, sortBy: name, sort: value });
  };

  useEffect(() => {
    fetchDashboard(params);
  }, [params]);

  console.log("HOOKS RUN");

  return {
    dashboard,
    params,
    setParams,
    handleChange,
    handleSort,
    today,
    month,
    year,
    lastDate,
  };
}
