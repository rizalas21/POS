import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeadersDashboard() {
  return (
    <header className="flex justify-between">
      <h1 className="text-2xl text-gray-700">Dashboard</h1>
      <button className="px-2 py-1 text-white bg-blue-600 rounded">
        <FontAwesomeIcon icon={faDownload} />
        <span>Generate Report</span>
      </button>
    </header>
  );
}
