import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SideBar() {
  const [isShowUtilities, setShowUtilities] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`flex bg-blue-600 w-full flex-col items-center h-screen z-10`}
    >
      <section className="text-white flex justify-around items-center w-4/5 h-[10%] border-b border-slate-100 py-8">
        <div className="flex justify-between items-center w-2/5 gap-2">
          <FontAwesomeIcon
            style={{ fontSize: "33px", transform: "rotate(-25deg)" }}
            icon={faFaceLaughWink}
          ></FontAwesomeIcon>
          <h1 className="text-white font-bold text-center text-xl">POS</h1>
        </div>
      </section>
      <section
        className={`flex items-center w-4/5 h-[9%] border-b border-white py-2 px-1 ${
          pathname === "/dashboard" ? "opacity-100" : "opacity-50"
        }`}
      >
        <Link
          className="flex justify-between items-center w-1/2 no-underline text-white"
          href="/dashboard"
        >
          <FontAwesomeIcon
            style={{
              fontSize: "24px",
              marginRight: "10px",
              clipPath: "inset(2px 0px 3px 0px)",
            }}
            icon={faTachometerAlt}
          ></FontAwesomeIcon>
          <h3>Dashboard</h3>
        </Link>
      </section>
      <section className="text-white flex flex-col w-4/5 h-auto border-b border-white mt-5 pb-5">
        <h4 className="mb-2">MASTER</h4>
        <button
          className={`w-auto my-2 no-underline text-inherit cursor-pointer hover:opacity-100 ${
            pathname === "/units" || pathname === "/goods" || isShowUtilities
              ? "opacity-100"
              : "opacity-50"
          }`}
          onClick={() => setShowUtilities(!isShowUtilities)}
        >
          <div className="flex items-center">
            <FontAwesomeIcon
              style={{ fontSize: "24px", maxWidth: "20px" }}
              icon={faWrench}
            />
            <h4 className="ml-5 font-extralight w-auto w-auto">
              Good Utilities
            </h4>
            <FontAwesomeIcon
              icon={isShowUtilities ? faChevronDown : faChevronRight}
              className="pl-[25%]"
            />
          </div>
          <div
            className={`flex-col bg-white border rounded-sm px-3 py-2 items-start cursor-default transition duration-300 ease-in-out mt-2  ${
              isShowUtilities ? "flex" : "hidden"
            }`}
          >
            <p className="text-gray-500/50 font-bold px-1 py-1">
              Good Utilities:
            </p>
            <Link
              href={"/goods"}
              className="text-black hover:bg-gray-500/25 px-1 py-1 rounded w-full text-start"
            >
              Goods
            </Link>
            <Link
              href={"/units"}
              className="text-black hover:bg-gray-500/25 px-1 py-1 rounded w-full text-start"
            >
              Units
            </Link>
          </div>
        </button>
        <Link
          className={`w-1/2 flex items-center my-2.5 no-underline text-inherit w-auto ${
            pathname === "/suppliers" ? "opacity-100" : "opacity-50"
          }`}
          href="/suppliers"
        >
          <FontAwesomeIcon
            style={{ fontSize: "24px", maxWidth: "20px" }}
            icon={faLink}
          />
          <h4 className="ml-5 font-extralight w-auto">Suppliers</h4>
        </Link>
        <Link
          className={`customers flex items-center my-2.5 no-underline text-inherit w-auto ${
            pathname === "/customers" ? "opacity-100" : "opacity-50"
          }`}
          href="/customers"
        >
          <FontAwesomeIcon
            style={{ fontSize: "24px", maxWidth: "20px" }}
            icon={faUsers}
          />
          <h4 className="ml-5 font-extralight w-auto ">Customers</h4>
        </Link>
        <Link
          className={`w-[42%] flex items-center my-2.5 no-underline text-inherit w-auto ${
            pathname === "/users" ? "opacity-100" : "opacity-50"
          }`}
          href="/users"
        >
          <FontAwesomeIcon
            style={{ fontSize: "22px", maxWidth: "20px" }}
            icon={faUser}
          />
          <h4 className="ml-5 font-extralight w-auto ">Users</h4>
        </Link>
      </section>
      <section className="text-white flex flex-col w-4/5 h-auto mt-5 pb-5 border-b border-slate-500">
        <h4 className="mb-2.5">TRANSACTIONS</h4>
        <Link
          className={`purchases flex items-center my-2.5 no-underline text-inherit w-auto ${
            pathname === "/purchases" ? "opacity-100" : "opacity-50"
          }`}
          href="/purchases"
        >
          <FontAwesomeIcon
            style={{ fontSize: "24px", maxWidth: "20px" }}
            icon={faTable}
          />
          <h4 className="ml-5 font-extralight w-auto ">Purchases</h4>
        </Link>
        <Link
          className={`w-[42%] flex items-center my-2.5 no-underline text-inherit w-auto ${
            pathname === "/sales" ? "opacity-100" : "opacity-50"
          }`}
          href="/sales"
        >
          <FontAwesomeIcon
            style={{ fontSize: "24px", maxWidth: "20px" }}
            icon={faChartArea}
          />
          <h4 className="ml-5 font-extralight w-auto ">Sales</h4>
        </Link>
      </section>
      <section className="border-none mt-5 items-center text-white flex flex-col w-4/5 h-auto border-b  border-slate-500 mt-5 pb-5">
        <div className="bg-slate-100 w-1/5 rounded-[50%] opacity-50">
          <FontAwesomeIcon
            icon={faAngleLeft}
            style={{
              fontSize: "15px",
              width: "100%",
              background: "#ccc",
              borderRadius: "50%",
              padding: "15px 0",
              fontWeight: "1000",
            }}
          />
        </div>
      </section>
    </div>
  );
}

// IKON
/*
wrench = good utilities
link = suppliers
users = customers
user = users
table = purchase
chart area = sales

*/
