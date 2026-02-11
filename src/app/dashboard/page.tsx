"use client";

import {
  faArrowDown,
  faArrowLeft,
  faArrowUp,
  faCalendar,
  faCheck,
  faComments,
  faDatabase,
  faDollarSign,
  faDownload,
  faEllipsisVertical,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

ChartJS.register(LineElement, PointElement, LinearScale, Title);

export default function dashboard() {
  const [params, setParams] = useState({
    keyword: "",
    limit: "3",
    page: "1",
    sortBy: "",
    sort: "asc",
  });
  return (
    <main className="space-y-3 mb-[7%] bg-gray-400/25">
      <header className="flex justify-between">
        <h1 className="text-2xl text-gray-700">Dashboard</h1>
        <button className="px-2 py-1 text-white bg-blue-600 rounded">
          <FontAwesomeIcon icon={faDownload} />
          <span>Generate Report</span>
        </button>
      </header>
      <section className="shadow-lg h-auto border border-slate-500/25 rounded">
        <header className="w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pl-2 py-2 flex justify-start items-center bg-slate-100">
          <h2 className="text-blue-600 font-bold">Date Settings</h2>
        </header>
        <form className="flex justify-between px-4 py-4 w-full bg-white border-y border-slate-500/50">
          <fieldset className="space-y-2 flex flex-col w-2/5">
            <label className="text-slate-500">Start Date</label>
            <input
              type="date"
              className="border rounded py-1 px-2 border-slate-500/50"
            />
          </fieldset>
          <fieldset className="space-y-2 flex flex-col w-2/5">
            <label className="text-slate-500">End Date</label>
            <input
              type="date"
              className="border rounded py-1 px-2 border-slate-500/50"
            />
          </fieldset>
        </form>
        <div className="w-full h-[8vh] pl-2 flex justify-start items-center bg-slate-100 gap-2">
          <button
            className="flex w-[8vw] h-auto justify-between items-center bg-green-600 cursor-pointer rounded"
            type="submit"
            // onClick={handleSubmit}
          >
            <FontAwesomeIcon
              className="rounded-l text-center bg-green-700 px-2 py-1 text-slate-300 w-1/5 text-white"
              icon={faCheck}
            />
            <p className="rounded-l text-center bg-green-500 px-2 py-1 text-slate-300 w-4/5 hover:bg-green-700 h-full text-white font-medium">
              Query
            </p>
          </button>
          <button className="flex w-[8vw] h-auto justify-between items-center bg-yellow-600 cursor-pointer rounded">
            <FontAwesomeIcon
              className="rounded-l text-center bg-yellow-700 px-2 py-1 text-slate-300 w-1/5 text-white"
              icon={faArrowLeft}
            />
            <p
              className="rounded-l text-center bg-yellow-500 px-2 py-1 text-slate-300 w-4/5 hover:bg-yellow-700 h-full text-white font-medium cursor-pointer"
              // onClick={() => router.back()}
            >
              Reset
            </p>
          </button>
        </div>
      </section>
      <section className="grid grid-cols-4 gap-4 w-full bg-slate-100">
        <div className="flex justify-between items-center px-4 py-4 border-l-3 border-blue-700 rounded-md bg-white text-slate-900 shadow-lg">
          <div>
            <label className="text-sm text-blue-700 font-bold ">
              PURCHASES
            </label>
            <p className="text-lg font-bold">RP 715.000,00</p>
          </div>
          <FontAwesomeIcon icon={faCalendar} className="text-4xl opacity-25" />
        </div>
        <div className="flex justify-between items-center px-4 py-4 border-l-3 border-green-600 rounded-md bg-white text-slate-900 shadow-lg">
          <div>
            <label className="text-sm text-green-600 font-bold ">SALES</label>
            <p className="text-lg font-bold">RP 859.000,00</p>
          </div>
          <FontAwesomeIcon
            icon={faDollarSign}
            className="text-4xl opacity-25"
          />
        </div>
        <div className="flex justify-between items-center px-4 py-4 border-l-3 border-cyan-500 rounded-md bg-white text-slate-900 shadow-lg">
          <div>
            <label className="text-sm text-cyan-500 font-bold ">EARNINGS</label>
            <p className="text-lg font-bold">RP 144.000,00</p>
          </div>
          <FontAwesomeIcon
            icon={faDollarSign}
            className="text-4xl opacity-25"
          />
        </div>
        <div className="flex justify-between items-center px-4 py-4 border-l-3 border-yellow-500 rounded-md bg-white text-slate-900 shadow-lg">
          <div>
            <label className="text-sm text-yellow-500 font-bold ">
              TOTAL SALES
            </label>
            <p className="text-lg font-bold">4</p>
          </div>
          <FontAwesomeIcon icon={faComments} className="text-4xl opacity-25" />
        </div>
      </section>
      <section className="flex gap-1 w-full">
        <div className="shadow-lg h-auto border border-slate-500/25 rounded min-w-8/12">
          <header className="w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pl-2 py-4 px-4 flex justify-between items-center bg-slate-100">
            <h2 className="text-blue-600 font-bold">Earnings Overview</h2>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </header>
          {/* <Chart type="line" data={} options={} /> */}
        </div>
        <div className="shadow-lg h-auto border border-slate-500/25 rounded min-w-4/12">
          <header className="w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pl-2 py-4 px-4 flex justify-between items-center bg-slate-100">
            <h2 className="text-blue-600 font-bold">Revenue Sources</h2>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </header>
          {/* <Chart type="line" data={} options={} /> */}
        </div>
      </section>
      <section className="table w-full shadow-lg border border-slate-500/25 rounded bg-white px-4 py-2">
        <h3 className="px-2 py-2 -mx-4 -mt-2 bg-slate-100 text-blue-600 font-bold text-base">
          Earnings Monthly Report
        </h3>
        <div className="flex justify-between items-center py-2">
          <div className="w-2/12 flex justify-around items-center">
            <p>Show</p>
            <input
              className="border border-slate-300 rounded w-2/6 px-1.5"
              title="show-data"
              type="number"
              name="limit"
              id=""
              min={1}
              // max={Number(total)}
              // value={Number(params.limit)}
              // onChange={(e) => handleChange(e)}
            />
            <p>entries</p>
          </div>
          <div className="flex w-4/12 justify-end items-center">
            <p>Search: </p>
            <input
              className="border-2 border-slate-300 rounded px-2 py-1 h-8"
              title="search"
              type="text"
              name="keyword"
              // onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <table className="w-full table-auto border-collapse px-2 py-2 border border-gray-500/25 rounded">
          <thead>
            <tr className="text-slate-500">
              <th className="px-2 py-2 border border-gray-500/25 text-center">
                <div className="w-full flex justify-between">
                  <h3>Monthly</h3>
                  <div className="icon-thead flex">
                    <button
                      className={`text-sm cursor-pointer hover:text-gray-700 ${
                        params.sortBy !== "customerid"
                          ? "text-gray-700/50"
                          : params.sort === "asc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                      }`}
                      name="Monthly"
                      value="asc"
                      // onClick={handleSort}
                    >
                      <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                    <button
                      className={`text-sm cursor-pointer hover:text-gray-700 ${
                        params.sortBy !== "customerid"
                          ? "text-gray-700/50"
                          : params.sort === "desc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                      }`}
                      name="customerid"
                      value="desc"
                      // onClick={handleSort}
                    >
                      <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                  </div>
                </div>
              </th>
              <th className="px-2 py-2 border border-gray-500/25 text-center">
                <div className="w-full flex justify-between">
                  <h3>Expense</h3>
                  <div className="icon-thead flex">
                    <button
                      className={`text-sm cursor-pointer hover:text-gray-700 ${
                        params.sortBy !== "name"
                          ? "text-gray-700/50"
                          : params.sort === "asc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                      }`}
                      name="expense"
                      value="asc"
                      // onClick={handleSort}
                    >
                      <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                    <button
                      className={`text-sm cursor-pointer hover:text-gray-700 ${
                        params.sortBy !== "name"
                          ? "text-gray-700/50"
                          : params.sort === "desc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                      }`}
                      name="expense"
                      value="desc"
                      // onClick={handleSort}
                    >
                      <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                  </div>
                </div>
              </th>
              <th className="px-2 py-2 border border-gray-500/25 text-center">
                <div className="w-full flex justify-between">
                  <h3>Revenue</h3>
                  <div className="icon-thead flex">
                    <button
                      className={`text-sm cursor-pointer hover:text-gray-700 ${
                        params.sortBy !== "address"
                          ? "text-gray-700/50"
                          : params.sort === "asc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                      }`}
                      name="revenue"
                      value="asc"
                      // onClick={handleSort}
                    >
                      <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                    <button
                      className={`text-sm cursor-pointer hover:text-gray-700 ${
                        params.sortBy !== "address"
                          ? "text-gray-700/50"
                          : params.sort === "desc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                      }`}
                      name="revenue"
                      value="desc"
                      // onClick={handleSort}
                    >
                      <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                  </div>
                </div>
              </th>
              <th className="px-2 py-2 border border-gray-500/25 text-center">
                <div className="w-full flex justify-between">
                  <h3>Earning</h3>
                  <div className="icon-thead flex">
                    <button
                      className={`text-sm cursor-pointer hover:text-gray-700 ${
                        params.sortBy !== "phone"
                          ? "text-gray-700/50"
                          : params.sort === "asc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                      }`}
                      name="revenue"
                      value="asc"
                      // onClick={handleSort}
                    >
                      <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                    <button
                      className={`text-sm cursor-pointer hover:text-gray-700 ${
                        params.sortBy !== "phone"
                          ? "text-gray-700/50"
                          : params.sort === "desc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                      }`}
                      name="revenue"
                      value="desc"
                      // onClick={handleSort}
                    >
                      <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {customers.length > 0 ? (
              customers.map((customer: Customers, index: any) => (
                <tr className="text-slate-500" key={index}>
                  <td className="px-2 py-2 border border-gray-500/25 text-center">
                    {customer.customerid}
                  </td>
                  <td className="px-2 py-2 border border-gray-500/25 text-center">
                    {customer.name}
                  </td>
                  <td className="px-2 py-2 border border-gray-500/25 text-center">
                    {customer.address}
                  </td>
                  <td className="px-2 py-2 border border-gray-500/25 text-center">
                    {customer.phone}
                  </td>
                  <td className="px-2 py-2 border border-gray-500/25 text-center">
                    <div className="flex gap-4">
                      <button
                        className="text-white hover:cursor-pointer bg-green-600 w-[3vw] rounded-[50%] px-2 py-2 hover:bg-green-800"
                        onClick={() =>
                          router.push(`/customers/edit/${customer.customerid}`)
                        }
                      >
                        <FontAwesomeIcon icon={faCircleInfo} />
                      </button>
                      <button
                        className="text-white hover:cursor-pointer bg-red-600 w-[3vw] rounded-[50%] px-2 py-2 hover:bg-red-800"
                        onClick={() => {
                          setSelectedCustomers({
                            customerid: customer.customerid.toString(),
                            name: customer.name,
                            address: customer.address,
                            phone: customer.phone,
                          });
                          setShowModal(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) */}
            ) : (
            <tr>
              <td className="text-center py-6 text-gray-500" colSpan={4}>
                No Customers Found.
              </td>
            </tr>
            )
          </tbody>
        </table>
      </section>
    </main>
  );
}
