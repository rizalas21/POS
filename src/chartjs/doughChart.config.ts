import { RevenueSource } from "@/types/dashboard";
import { ChartOptions } from "chart.js";

type RevenueData = {
  customerRevenue: RevenueSource;
  directRevenue: RevenueSource;
};

export const createDoughnutData = (data: RevenueData) => ({
  labels: [data.customerRevenue.label, data.directRevenue.label],

  datasets: [
    {
      label: "Revenue",
      data: [data.customerRevenue.value, data.directRevenue.value],
      backgroundColor: ["#4e73df", "#1cc88a"],
    },
  ],
});

export const doughnutOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.6,
  cutout: "70%",

  plugins: {
    legend: {
      position: "bottom",

      labels: {
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
  },
};
