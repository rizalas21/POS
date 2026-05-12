"use client";
import useDashboard from "@/hooks/useDashboard";
import toRupiah from "@/lib/toRupiah";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EarningsTable() {
  const { dashboard, params, setParams, handleChange, handleSort } =
    useDashboard();
  const overLimit =
    (Number(params.page) - 1) * Number(params.limit) + Number(params.limit);

  const cards = dashboard?.cards;
  const dataTable = dashboard?.dataTable ?? [];
  const meta = { pages: dashboard?.pages || 0, total: dashboard?.total || 0 };

  return (
    <section className="table w-full shadow-lg border border-slate-500/25 rounded bg-white px-4 py-2 text-slate-900">
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
            max={cards?.totalSales}
            defaultValue={Number(params.limit)}
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
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
                      params.sortBy !== "month"
                        ? "text-gray-700/50"
                        : params.sort === "asc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                    }`}
                    name="month"
                    value="asc"
                    onClick={handleSort}
                  >
                    <FontAwesomeIcon icon={faArrowUp} />
                  </button>
                  <button
                    className={`text-sm cursor-pointer hover:text-gray-700 ${
                      params.sortBy !== "month"
                        ? "text-gray-700/50"
                        : params.sort === "desc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                    }`}
                    name="month"
                    value="desc"
                    onClick={handleSort}
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
                      params.sortBy !== "expense"
                        ? "text-gray-700/50"
                        : params.sort === "asc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                    }`}
                    name="expense"
                    value="asc"
                    onClick={handleSort}
                  >
                    <FontAwesomeIcon icon={faArrowUp} />
                  </button>
                  <button
                    className={`text-sm cursor-pointer hover:text-gray-700 ${
                      params.sortBy !== "expense"
                        ? "text-gray-700/50"
                        : params.sort === "desc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                    }`}
                    name="expense"
                    value="desc"
                    onClick={handleSort}
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
                      params.sortBy !== "revenue"
                        ? "text-gray-700/50"
                        : params.sort === "asc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                    }`}
                    name="revenue"
                    value="asc"
                    onClick={handleSort}
                  >
                    <FontAwesomeIcon icon={faArrowUp} />
                  </button>
                  <button
                    className={`text-sm cursor-pointer hover:text-gray-700 ${
                      params.sortBy !== "revenue"
                        ? "text-gray-700/50"
                        : params.sort === "desc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                    }`}
                    name="revenue"
                    value="desc"
                    onClick={handleSort}
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
                      params.sortBy !== "earning"
                        ? "text-gray-700/50"
                        : params.sort === "asc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                    }`}
                    name="earning"
                    value="asc"
                    onClick={handleSort}
                  >
                    <FontAwesomeIcon icon={faArrowUp} />
                  </button>
                  <button
                    className={`text-sm cursor-pointer hover:text-gray-700 ${
                      params.sortBy !== "earning"
                        ? "text-gray-700/50"
                        : params.sort === "desc"
                          ? "text-grayy-700"
                          : "text-gray-700/30"
                    }`}
                    name="earning"
                    value="desc"
                    onClick={handleSort}
                  >
                    <FontAwesomeIcon icon={faArrowDown} />
                  </button>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {dataTable?.length > 0 ? (
            dataTable?.map((item: any, index: any) => (
              <tr className="text-slate-500" key={index}>
                <td className="px-2 py-2 border border-gray-500/25 text-center">
                  {item.month}
                </td>
                <td className="px-2 py-2 border border-gray-500/25 text-center">
                  {toRupiah(item.expense)}
                </td>
                <td className="px-2 py-2 border border-gray-500/25 text-center">
                  {toRupiah(item.revenue)}
                </td>
                <td className="px-2 py-2 border border-gray-500/25 text-center">
                  {toRupiah(item.earning)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center py-6 text-gray-500" colSpan={4}>
                No data Found.
              </td>
            </tr>
          )}
          <tr className="text-slate-500">
            <th className="px-2 py-2 border border-gray-500/25 text-center">
              <div className="w-full flex justify-start">
                <h3>Total</h3>
              </div>
            </th>
            <th className="px-2 py-2 border border-gray-500/25 text-center">
              <div className="w-full flex justify-start">
                <h3>{cards ? toRupiah(cards?.purchases) : 0}</h3>
              </div>
            </th>
            <th className="px-2 py-2 border border-gray-500/25 text-center">
              <div className="w-full flex justify-start">
                <h3>{cards ? toRupiah(cards?.sales) : 0}</h3>
              </div>
            </th>
            <th className="px-2 py-2 border border-gray-500/25 text-center">
              <div className="w-full flex justify-start">
                <h3>{cards ? toRupiah(cards?.earnings) : 0}</h3>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
      <div className="flex p-2 justify-between">
        <p>
          showing{" "}
          {meta.total
            ? (Number(params.page) - 1) * Number(params.limit) + 1
            : 0}{" "}
          to{" "}
          {overLimit >= Number(meta.total) || params.limit === 0
            ? Number(meta.total)
            : overLimit}{" "}
          of {meta?.total.toString()} entries
        </p>
        <div className="flex border border-gray-500/50 rounded-sm">
          <button
            className={`bg-white-500 border-x border-gray-500/50 px-3 py-1 text-blue-500 ${
              Number(params.page) === 1
                ? "text-gray-500/50 cursor-default"
                : "cursor-pointer hover:bg-blue-500 hover:text-white"
            }`}
            disabled={Number(params.page) <= 1}
            onClick={() =>
              setParams({
                ...params,
                page: params.page - 1,
              })
            }
          >
            Previous
          </button>{" "}
          {Array.from({ length: meta.pages }).map((_, i) => (
            <button
              key={i}
              className={`bg-white-500 border-x border-gray-500/50 px-3 py-1 text-blue-500 cursor-pointer hover:text-white hover:bg-blue-500 ${
                i + 1 === Number(params.page) ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setParams({ ...params, page: i + 1 })}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`bg-white-500 border-x border-gray-500/50 px-3 py-1 text-blue-500 ${
              Number(params.page) >= meta.pages
                ? "text-gray-500/50 cursor-default"
                : "cursor-pointer hover:bg-blue-500 hover:text-white"
            }`}
            disabled={Number(params.page) === meta.pages}
            onClick={() =>
              setParams({
                ...params,
                page: Number(params.page) + 1,
              })
            }
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
