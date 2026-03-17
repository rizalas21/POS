"use client";
import {
  createDoughnutData,
  doughnutOptions,
} from "@/chartjs/doughChart.config";
import { createLineData, lineOptions } from "@/chartjs/lineChart.config";
import useDashboard from "@/hooks/useDashboard";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chart } from "react-chartjs-2";

export default function OverviewEarnings() {
  const { dashboard } = useDashboard();

  return (
    <section className="flex gap-1 w-full">
      <div className="shadow-lg h-auto border border-slate-500/25 rounded min-w-7/12 bg-white">
        <header className="w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pl-2 py-4 px-4 flex justify-between items-center bg-slate-100">
          <h2 className="text-blue-600 font-bold">Earnings Overview</h2>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </header>
        {dashboard?.dataTable ? (
          <Chart
            type="line"
            data={createLineData(dashboard.chartData)}
            options={lineOptions}
          />
        ) : (
          ""
        )}
      </div>
      <div className="shadow-lg h-auto border border-slate-500/25 rounded min-w-5/12 bg-white space-y-10">
        <header className="w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pl-2 py-4 px-4 flex justify-between items-center bg-slate-100">
          <h2 className="text-blue-600 font-bold">Revenue Sources</h2>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </header>
        {dashboard?.customerRevenue && dashboard?.directRevenue ? (
          <Chart
            type="doughnut"
            data={createDoughnutData({
              customerRevenue: dashboard.customerRevenue,
              directRevenue: dashboard.directRevenue,
            })}
            options={doughnutOptions}
          />
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
