import toRupiah from "@/lib/toRupiah";
import { MonthlyData } from "@/types/dashboard";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  ArcElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  ChartOptions,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  ArcElement,
  LinearScale,
  CategoryScale,
  Legend,
  Title,
  Tooltip,
);

export const createLineData = (data: MonthlyData[]) => ({
  labels: data.map((i) => i.month),

  datasets: [
    {
      label: "Earnings",
      data: data.map((i) => i.earning),
      borderColor: "rgb(0,68,255)",
      backgroundColor: "#fff",
      tension: 0.4,
    },
  ],
});

export const lineOptions: ChartOptions<"line"> = {
  responsive: true,

  plugins: {
    legend: { display: false },

    tooltip: {
      callbacks: {
        title: (context) => `Month: ${context[0].label}`,

        label: (context) => {
          const value = context.raw as number;

          return "Earnings: " + toRupiah(value);
        },
      },
    },
  },
};
