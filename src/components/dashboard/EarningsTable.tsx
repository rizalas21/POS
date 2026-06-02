"use client";
import useDashboard from "@/hooks/useDashboard";
import toRupiah from "@/lib/toRupiah";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";

export default function EarningsTable({
  dataTable,
  cards,
  sp,
  page,
  pages,
  total,
}: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meta = { pages: pages || 0, total: total || 0 };
  const params = new URLSearchParams(searchParams);

  const overLimit = (Number(page) - 1) * Number(sp.limit) + Number(sp.limit);

  const handleSort = (e: any) => {
    const { name, value } = e.currentTarget;

    params.set("sortBy", name);
    params.set("sort", value);

    router.push(`?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "limit" || (name === "keyword" && page === pages)) {
      params.set(name, value);
      params.set("page", "1");
    } else {
      params.set(name, value);
    }

    router.push(`?${params}`);
  };

  const handlePagination = (value: string) => {
    params.set("page", value);

    router.push(`?${params}`);
  };

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
            defaultValue={"3"}
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
                      sp.sortBy !== "month"
                        ? "text-gray-700/50"
                        : sp.sort === "asc"
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
                      sp.sortBy !== "month"
                        ? "text-gray-700/50"
                        : sp.sort === "desc"
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
                      sp.sortBy !== "expense"
                        ? "text-gray-700/50"
                        : sp.sort === "asc"
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
                      sp.sortBy !== "expense"
                        ? "text-gray-700/50"
                        : sp.sort === "desc"
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
                      sp.sortBy !== "revenue"
                        ? "text-gray-700/50"
                        : sp.sort === "asc"
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
                      sp.sortBy !== "revenue"
                        ? "text-gray-700/50"
                        : sp.sort === "desc"
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
                      sp.sortBy !== "earning"
                        ? "text-gray-700/50"
                        : sp.sort === "asc"
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
                      sp.sortBy !== "earning"
                        ? "text-gray-700/50"
                        : sp.sort === "desc"
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
          {meta.total ? (Number(sp.page) - 1) * Number(sp.limit) + 1 : 0} to{" "}
          {overLimit >= Number(meta.total) || sp.limit === 0
            ? Number(meta.total)
            : overLimit}{" "}
          of {meta?.total.toString()} entries
        </p>
        <div className="flex border border-gray-500/50 rounded-sm">
          <button
            className={`bg-white-500 border-x border-gray-500/50 px-3 py-1 text-blue-500 ${
              Number(sp.page) === 1
                ? "text-gray-500/50 cursor-default"
                : "cursor-pointer hover:bg-blue-500 hover:text-white"
            }`}
            disabled={Number(sp.page) <= 1}
            onClick={() => handlePagination(String(page - 1))}
          >
            Previous
          </button>{" "}
          {Array.from({ length: meta.pages }).map((_, i) => (
            <button
              key={i}
              className={`bg-white-500 border-x border-gray-500/50 px-3 py-1 text-blue-500 cursor-pointer hover:text-white hover:bg-blue-500 ${
                i + 1 === Number(sp.page) ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handlePagination(String(i + 1))}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`bg-white-500 border-x border-gray-500/50 px-3 py-1 text-blue-500 ${
              Number(sp.page) >= meta.pages
                ? "text-gray-500/50 cursor-default"
                : "cursor-pointer hover:bg-blue-500 hover:text-white"
            }`}
            disabled={Number(sp.page) === meta.pages}
            onClick={() => handlePagination(String(page + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
