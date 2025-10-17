"use client";

import { ModalDeleteUnits } from "@/components/units/ModalDelete";
import { usePurchasesStore } from "@/stores/purchasesStore";
import {
  faArrowDown,
  faArrowUp,
  faCircleInfo,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Purchases } from "../types/purchases";
import { ModalDeletePurchases } from "@/components/purchases/ModalDelete";
import dateToString from "@/lib/dateToString";
import { useSuppliersStore } from "@/stores/suppliersStore";

export default function purchases() {
  const [params, setParams] = useState({
    keyword: "",
    limit: "3",
    page: "1",
    sortBy: "invoice",
    sort: "desc",
  });
  const [selectedPurchases, setSelectedPurchases] = useState({
    invoice: "",
    time: "",
    totalsum: 1,
    supplier: 1,
    operator: "",
  });
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { purchases, getPurchases, page, pages, total } = usePurchasesStore();
  const [isLoading, setIsloading] = useState(true);
  const overLimit =
    (Number(page) - 1) * Number(params.limit) + Number(params.limit);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "limit" || (name === "keyword" && page === pages)) {
      setParams({ ...params, [name]: value, page: "1" });
    } else {
      setParams({ ...params, [name]: value });
    }
  };

  const handleSort = (e: any) => {
    const { name, value } = e.currentTarget;

    setParams({ ...params, sortBy: name, sort: value });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        getPurchases(params);
      } catch (error) {
        console.log("error when getPurchases");
      } finally {
        setIsloading(false);
      }
    };
    fetchUsers();
  }, [params]);
  return (
    <main className="space-y-3">
      <h1 className="text-2xl text-gray-700">Purchases</h1>
      <p>This is data of Purchases</p>
      <div className="shadow-2xl h-auto bg-white">
        <div className="w-full h-[8vh] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] mb-2 pl-2 flex justify-start items-center bg-slate-100">
          <Link
            href={"/purchases/add"}
            className="flex justify-start text-white font-thin rounded-[5px] text-center items-center hover:bg-blue-800"
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="rounded-l text-center bg-blue-700 px-2.5 py-2 text-slate-300 w-[1vw]"
            />
            <p className="rounded-r text-center bg-blue-600 px-2.5 py-1 text-base w-[4vw] hover:bg-blue-700">
              Add
            </p>
          </Link>
        </div>
        <section className="table w-full px-4">
          <div className="flex justify-between items-center mb-5 px-2">
            <div className="w-[17%] flex justify-between items-center">
              <p>Show</p>
              <input
                className="border border-slate-300 w-2/6 px-1.5"
                title="show-data"
                type="number"
                name="limit"
                id=""
                min={1}
                max={Number(total)}
                defaultValue={3}
                onChange={(e) => handleChange(e)}
              />
              <p>entries</p>
            </div>
            <div className="flex w-4/12 justify-evenly items-center">
              <p>Search: </p>
              <input
                className="border-2 border-slate-300 px-2 py-1 h-8"
                title="search"
                type="text"
                name="keyword"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          {isLoading ? (
            <p className="text-center py-6 text-gray-500">Loading...</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-slate-500">
                  <th className="px-2 py-2 border border-gray-500/25 text-center">
                    <div className="flex justify-between items-center">
                      <h3>Purchases</h3>
                      <div className="flex space-x-2">
                        <button
                          className={`text-sm cursor-pointer hover:text-gray-700 ${
                            params.sortBy !== "invoice"
                              ? "text-gray-700/50"
                              : params.sort === "asc"
                              ? "text-gray-700"
                              : "text-gray-700/30"
                          }`}
                          name="invoice"
                          value="asc"
                          onClick={handleSort}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <button
                          className={`text-sm cursor-pointer hover:text-gray-700 ${
                            params.sortBy !== "invoice"
                              ? "text-gray-700/50"
                              : params.sort === "desc"
                              ? "text-gray-700"
                              : "text-gray-700/30"
                          }`}
                          name="invoice"
                          value="desc"
                          onClick={handleSort}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                      </div>
                    </div>
                  </th>
                  <th className="px-2 py-2 border border-gray-500/25 text-center">
                    <div className="flex justify-between items-center">
                      <h3>Time</h3>
                      <div className="flex space-x-2">
                        <button
                          className={`text-sm cursor-pointer hover:text-gray-700 ${
                            params.sortBy !== "time"
                              ? "text-gray-700/50"
                              : params.sort === "asc"
                              ? "text-gray-700"
                              : "text-gray-700/30"
                          }`}
                          name="time"
                          value="asc"
                          onClick={handleSort}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <button
                          className={`text-sm cursor-pointer hover:text-gray-700 ${
                            params.sortBy !== "time"
                              ? "text-gray-700/50"
                              : params.sort === "desc"
                              ? "text-gray-700"
                              : "text-gray-700/30"
                          }`}
                          name="time"
                          value="desc"
                          onClick={handleSort}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                      </div>
                    </div>
                  </th>
                  <th className="px-2 py-2 border border-gray-500/25 text-center">
                    <div className="flex justify-between items-center">
                      <h3>Total Summary</h3>
                      <div className="flex space-x-2">
                        <button
                          className={`text-sm cursor-pointer hover:text-gray-700 ${
                            params.sortBy !== "totalsum"
                              ? "text-gray-700/50"
                              : params.sort === "asc"
                              ? "text-gray-700"
                              : "text-gray-700/30"
                          }`}
                          name="totalsum"
                          value="asc"
                          onClick={handleSort}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <button
                          className={`text-sm cursor-pointer hover:text-gray-700 ${
                            params.sortBy !== "totalsum"
                              ? "text-gray-700/50"
                              : params.sort === "desc"
                              ? "text-gray-700"
                              : "text-gray-700/30"
                          }`}
                          name="totalsum"
                          value="desc"
                          onClick={handleSort}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                      </div>
                    </div>
                  </th>
                  <th className="px-2 py-2 border border-gray-500/25 text-center">
                    <div className="flex justify-between items-center">
                      <h3>Supplier</h3>
                      <div className="flex space-x-2">
                        <button
                          className={`text-sm cursor-pointer hover:text-gray-700 ${
                            params.sortBy !== "supplier"
                              ? "text-gray-700/50"
                              : params.sort === "asc"
                              ? "text-gray-700"
                              : "text-gray-700/30"
                          }`}
                          name="supplier"
                          value="asc"
                          onClick={handleSort}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <button
                          className={`text-sm cursor-pointer hover:text-gray-700 ${
                            params.sortBy !== "supplier"
                              ? "text-gray-700/50"
                              : params.sort === "desc"
                              ? "text-gray-700"
                              : "text-gray-700/30"
                          }`}
                          name="supplier"
                          value="desc"
                          onClick={handleSort}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                      </div>
                    </div>
                  </th>
                  <th className="px-2 py-2 border border-gray-500/25 text-center">
                    <h3>Actions</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {purchases.length > 0 ? (
                  purchases.map((purchase, index) => (
                    <tr className="text-slate-500" key={index}>
                      <td className="px-2 py-2 border border-gray-500/25 text-center">
                        {purchase.invoice}
                      </td>
                      <td className="px-2 py-2 border border-gray-500/25 text-center">
                        {dateToString(purchase.time.toString())}
                      </td>
                      <td className="px-2 py-2 border border-gray-500/25 text-center">
                        {purchase.totalsum}
                      </td>
                      <td className="px-2 py-2 border border-gray-500/25 text-center">
                        {purchase.suppliers?.name
                          ? purchase.suppliers.name
                          : ""}
                      </td>
                      <td className="px-2 py-2 border border-gray-500/25 text-center">
                        <div className="flex gap-4">
                          <button
                            className="text-white bg-green-600 rounded-full px-2 py-1 hover:bg-green-800"
                            onClick={() =>
                              router.push(`/purchases/edit/${purchase.invoice}`)
                            }
                          >
                            <FontAwesomeIcon icon={faCircleInfo} />
                          </button>
                          <button
                            className="text-white bg-red-600 rounded-full px-2 py-1 hover:bg-red-800"
                            onClick={() => {
                              setSelectedPurchases({
                                invoice: purchase.invoice,
                                time: purchase.time.toString(),
                                totalsum: purchase.totalsum,
                                supplier: purchase.suppliers
                                  ?.supplierid as number,
                                operator: String(purchase.operator),
                              });
                              setShowModal(true);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center py-6 text-gray-500" colSpan={5}>
                      No Purchases Found.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="text-slate-500">
                  <th className="px-2 py-2 border border-gray-500/25 text-left">
                    Invoice
                  </th>
                  <th className="px-2 py-2 border border-gray-500/25 text-left">
                    Time
                  </th>
                  <th className="px-2 py-2 border border-gray-500/25 text-left">
                    Total Summary
                  </th>
                  <th className="px-2 py-2 border border-gray-500/25 text-left">
                    Supplier
                  </th>
                  <th className="px-2 py-2 border border-gray-500/25 text-left">
                    Actions
                  </th>
                </tr>
              </tfoot>
            </table>
          )}
          <div className="flex p-2 justify-between">
            <p>
              showing {(Number(page) - 1) * Number(params.limit) + 1} to{" "}
              {overLimit >= Number(total) || params.limit === "0"
                ? Number(total)
                : overLimit}{" "}
              of {total.toString()} entries
            </p>
            <div className="flex border border-gray-500/50 rounded-sm">
              <button
                className={`bg-white-500 border-x border-gray-500/50 px-3 py-1 text-blue-500 ${
                  page === 1
                    ? "text-gray-500/50 cursor-default"
                    : "cursor-pointer hover:bg-blue-500 hover:text-white"
                }`}
                disabled={page === 1}
                onClick={() =>
                  setParams({ ...params, page: (Number(page) - 1).toString() })
                }
              >
                Previous
              </button>
              {Array.from({ length: Number(pages) }).map((_, i) => (
                <button
                  key={i}
                  className={`bg-white-500 border-x border-gray-500/50 px-3 py-1 text-blue-500 cursor-pointer hover:text-white hover:bg-blue-500 ${
                    i + 1 === page ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() =>
                    setParams({ ...params, page: (i + 1).toString() })
                  }
                >
                  {i + 1}
                </button>
              ))}
              <button
                className={`bg-white-500 border-x border-gray-500/50 px-3 py-1 text-blue-500 ${
                  page === pages
                    ? "text-gray-500/50 cursor-default"
                    : "cursor-pointer hover:bg-blue-500 hover:text-white"
                }`}
                disabled={page === pages}
                onClick={() =>
                  setParams({ ...params, page: (Number(page) + 1).toString() })
                }
              >
                Next
              </button>
            </div>
          </div>
        </section>
        {showModal ? (
          <ModalDeletePurchases
            selectedPurchases={selectedPurchases}
            setShowModal={setShowModal}
          />
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
