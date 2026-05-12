import Cards from "@/components/dashboard/Cards";
import EarningsTable from "@/components/dashboard/EarningsTable";
import FilterDashboard from "@/components/dashboard/FilterDashboard";
import HeadersDashboard from "@/components/dashboard/HeadersDashboard";
import OverviewEarnings from "@/components/dashboard/OverviewEarnings";
import { getDashboard } from "@/features/dashboard/dashboard.service";

export default async function dashboard({ searchParams }: any) {
  const sp = await searchParams;
  const params = {
    startDate: sp.startDate || "",
    endDate: sp.endDate || "",
    keyword: sp.keyword || "",
    sort: sp.sort || "asc",
    sortBy: sp.sortBy || "month",
    page: sp.page || 1,
    limit: sp.limit || 3,
  } as const;
  const { cards, customerRevenue, directRevenue, dataTable, chartData } =
    await getDashboard(params);
  return (
    <main className="space-y-3">
      <HeadersDashboard />
      <FilterDashboard sp={sp} />
      <Cards cards={cards} />
      <OverviewEarnings
        customerRevenue={customerRevenue}
        directRevenue={directRevenue}
        dataTable={dataTable}
        chartData={chartData}
      />
      <EarningsTable />
    </main>
  );
}

// const data = {
//   chartData: [
//     { month: 'Jan 26', expense: 0, revenue: 5000, earning: 5000 },
//     { month: 'Feb 26', expense: 50000, revenue: 44000, earning: -6000 },
//     {
//       month: 'Mar 26',
//       expense: 16000,
//       revenue: 186000,
//       earning: 170000
//     },
//     { month: 'Apr 26', expense: 50000, revenue: 0, earning: -50000 }
//   ],
//   cards: { purchases: 116000, sales: 235000, earnings: 119000, totalSales: 5 },
//   dataTable: [
//     { month: 'Jan 26', expense: 0, revenue: 5000, earning: 5000 },
//     { month: 'Feb 26', expense: 50000, revenue: 44000, earning: -6000 },
//     {
//       month: 'Mar 26',
//       expense: 16000,
//       revenue: 186000,
//       earning: 170000
//     }
//   ],
//   customerRevenue: { label: 'Customer', value: 93000 },
//   directRevenue: { label: 'Direct', value: 142000 },
//   page: 1,
//   pages: 2,
//   total: 4
// }
