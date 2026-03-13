import Cards from "./Cards";
import EarningsTable from "./EarningsTable";
import FilterDashboard from "./FilterDashboard";
import HeadersDashboard from "./HeadersDashboard";
import OverviewEarnings from "./OverviewEarnings";

export default function Dashboard() {
  return (
    <>
      <HeadersDashboard />\
      <FilterDashboard />
      <Cards />
      <OverviewEarnings />
      <EarningsTable />
    </>
  );
}
