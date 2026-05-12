import {
  faAngleLeft,
  faChartArea,
  faChevronDown,
  faChevronRight,
  faFaceLaughWink,
  faLink,
  faTable,
  faTachometerAlt,
  faUser,
  faUsers,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminSideBar() {
  const [isShowUtilities, setIsShowUtilities] = useState(false);
  const pathname = usePathname();

  const handleClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-blue-600 z-10">
      
      {/* HEADER */}
      <section className="w-4/5 py-6 flex items-center justify-center border-b border-slate-100 text-white">
        <Link href="/" className="flex items-center gap-3 w-full">
          <FontAwesomeIcon
            icon={faFaceLaughWink}
            style={{ fontSize: "33px", transform: "rotate(-25deg)" }}
          />
          <h1 className="text-xl font-bold">POS</h1>
        </Link>
      </section>

      {/* DASHBOARD */}
      <section
        className={`w-4/5 py-3 px-1 border-b border-white ${
          pathname.startsWith("/dashboard")
            ? "text-white"
            : "text-slate-200/50"
        }`}
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-4 w-full"
        >
          <FontAwesomeIcon
            icon={faTachometerAlt}
            style={{
              fontSize: "24px",
              clipPath: "inset(2px 0px 3px 0px)",
            }}
          />
          <h3>Dashboard</h3>
        </Link>
      </section>

      {/* MASTER */}
      <section className="w-4/5 mt-5 pb-5 border-b border-white text-white flex flex-col">
        <h4 className="mb-3 text-sm tracking-wide">MASTER</h4>

        {/* UTILITIES */}
        <button
          onClick={() => setIsShowUtilities(!isShowUtilities)}
          className={`my-2 text-left transition-opacity ${
            pathname.startsWith("/units") ||
            pathname.startsWith("/goods") ||
            isShowUtilities
              ? "opacity-100"
              : "opacity-50"
          }`}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faWrench} className="text-xl" />
            <h4 className="ml-5 font-extralight">Good Utilities</h4>
            <FontAwesomeIcon
              icon={isShowUtilities ? faChevronDown : faChevronRight}
              className="ml-auto"
            />
          </div>

          {/* DROPDOWN */}
          <div
            className={`mt-2 px-3 py-2 bg-white rounded-sm transition-all duration-200 ${
              isShowUtilities ? "flex flex-col" : "hidden"
            }`}
          >
            <p className="text-xs font-bold text-gray-400 mb-1">
              Good Utilities:
            </p>

            <Link
              href="/goods"
              onClick={handleClick}
              className={`px-2 py-1 rounded text-sm text-black hover:bg-gray-200 ${
                pathname.startsWith("/goods") ? "bg-gray-200" : ""
              }`}
            >
              Goods
            </Link>

            <Link
              href="/units"
              onClick={handleClick}
              className={`px-2 py-1 rounded text-sm text-black hover:bg-gray-200 ${
                pathname.startsWith("/units") ? "bg-gray-200" : ""
              }`}
            >
              Units
            </Link>
          </div>
        </button>

        <Link
          href="/suppliers"
          className={`flex items-center gap-4 my-2.5 transition-opacity hover:opacity-100 ${
            pathname.startsWith("/suppliers") ? "opacity-100" : "opacity-50"
          }`}
        >
          <FontAwesomeIcon icon={faLink} className="text-xl" />
          <h4 className="font-extralight">Suppliers</h4>
        </Link>

        <Link
          href="/customers"
          className={`flex items-center gap-4 my-2.5 transition-opacity hover:opacity-100 ${
            pathname.startsWith("/customers") ? "opacity-100" : "opacity-50"
          }`}
        >
          <FontAwesomeIcon icon={faUsers} className="text-xl" />
          <h4 className="font-extralight">Customers</h4>
        </Link>

        <Link
          href="/users"
          className={`flex items-center gap-4 my-2.5 transition-opacity hover:opacity-100 ${
            pathname.startsWith("/users") ? "opacity-100" : "opacity-50"
          }`}
        >
          <FontAwesomeIcon icon={faUser} className="text-xl" />
          <h4 className="font-extralight">Users</h4>
        </Link>
      </section>

      {/* TRANSACTIONS */}
      <section className="w-4/5 mt-5 pb-5 border-b border-slate-500 text-white flex flex-col">
        <h4 className="mb-3 text-sm tracking-wide">TRANSACTIONS</h4>

        <Link
          href="/purchases"
          className={`flex items-center gap-4 my-2.5 transition-opacity hover:opacity-100 ${
            pathname.startsWith("/purchases") ? "opacity-100" : "opacity-50"
          }`}
        >
          <FontAwesomeIcon icon={faTable} className="text-xl" />
          <h4 className="font-extralight">Purchases</h4>
        </Link>

        <Link
          href="/sales"
          className={`flex items-center gap-4 my-2.5 transition-opacity hover:opacity-100 ${
            pathname.startsWith("/sales") ? "opacity-100" : "opacity-50"
          }`}
        >
          <FontAwesomeIcon icon={faChartArea} className="text-xl" />
          <h4 className="font-extralight">Sales</h4>
        </Link>
      </section>

      {/* FOOTER */}
      <section className="w-4/5 pb-5 flex justify-center">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 opacity-50 hover:opacity-100 transition">
          <FontAwesomeIcon icon={faAngleLeft} className="text-gray-600" />
        </div>
      </section>
    </div>
  );
}