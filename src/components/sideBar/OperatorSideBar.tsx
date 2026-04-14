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

export default function OperatorSideBar() {
  const [isShowUtilities, setIsShowUtilities] = useState(false);
  const pathname = usePathname();
  const handleClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`flex bg-blue-600 w-full flex-col items-center h-screen z-10`}
    >
      <section className="text-white flex justify-center items-center w-4/5 border-b border-slate-100 py-6">
        <Link href={"/"} className="flex items-center gap-3 w-full self-center">
          <FontAwesomeIcon
            style={{ fontSize: "33px", transform: "rotate(-25deg)" }}
            icon={faFaceLaughWink}
          />
          <h1 className="font-bold text-xl">POS</h1>
        </Link>
      </section>
      <section className="text-white flex flex-col w-4/5 h-auto border-b border-white mt-5 pb-5">
        <h4 className="mb-2">MASTER</h4>
        <Link
          className={`w-1/2 flex items-center my-2.5 no-underline text-inherit w-auto hover:opacity-100 ${
            pathname.startsWith("/suppliers") ? "opacity-100" : "opacity-50"
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
          className={`customers flex items-center my-2.5 no-underline text-inherit w-auto hover:opacity-100 ${
            pathname.startsWith("/customers") ? "opacity-100" : "opacity-50"
          }`}
          href="/customers"
        >
          <FontAwesomeIcon
            style={{ fontSize: "24px", maxWidth: "20px" }}
            icon={faUsers}
          />
          <h4 className="ml-5 font-extralight w-auto ">Customers</h4>
        </Link>
      </section>
      <section className="text-white flex flex-col w-4/5 h-auto mt-5 pb-5 border-b border-slate-500">
        <h4 className="mb-2.5">TRANSACTIONS</h4>
        <Link
          className={`purchases flex items-center my-2.5 no-underline text-inherit w-auto hover:opacity-100 ${
            pathname.startsWith("/purchases") ? "opacity-100" : "opacity-50"
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
          className={`w-[42%] flex items-center my-2.5 no-underline text-inherit w-auto hover:opacity-100 ${
            pathname.startsWith("/sales") ? "opacity-100" : "opacity-50"
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
