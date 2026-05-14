"use client";
import useDashboard from "@/hooks/useDashboard";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeadersDashboard() {
  const { params } = useDashboard();

  return (
    <header className="flex justify-between">
      <h1 className="text-2xl text-gray-700">Dashboard</h1>
      <button
        onClick={() => {
          const query = new URLSearchParams(
            `keyword=${params.keyword}&page=${params.page}&sortBy=${params.sortBy}&sort=${params.sort}&startDate=${params.startDate}&endDate=${params.endDate}`,
          );
          window.location.href = `/api/csv?${query}`;
        }}
        className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        <FontAwesomeIcon icon={faDownload} />
        <span>Generate Report</span>
      </button>
    </header>
  );
}
