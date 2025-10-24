"use client";

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
import { useSuppliersStore } from "@/stores/suppliersStore";
import { Suppliers } from "../types/suppliers";
import { useCustomersStore } from "@/stores/customersStore";
import { Customers } from "../types/customers";
import { ModalDeleteCustomers } from "@/components/customers/ModalDelete";

export default function suppliers() {
  const [params, setParams] = useState({
    keyword: "",
    limit: "3",
    page: "1",
    sortBy: "",
    sort: "",
  });
  const [selectedCustomers, setSelectedCustomers] = useState({
    customerid: "",
    name: "",
    address: "",
    phone: "",
  });
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { customers, getCustomers, page, pages, total } = useCustomersStore();
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
        getCustomers(params);
      } catch (error) {
        console.log("error when getUsers");
      } finally {
        setIsloading(false);
      }
    };
    fetchUsers();
  }, [params]);
  console.log("total ini teh bro => ", total);
  return (
    <main className="space-y-3">
      <h1 className="text-2xl text-gray-700">Customers</h1>
      <p>This is data of Customers</p>
      <div className="shadow-2xl h-auto bg-white">
        <div className="w-full h-[8vh] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] mb-2 pl-2 flex justify-start items-center bg-slate-100">
          <Link
            href={"/customers/add"}
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
                    <div className="w-full flex justify-between">
                      <h3>Customer id</h3>
                      <div className="icon-thead flex">
                        <button
                          className={`text-sm cursor-pointer hover:text-gray-700 ${
                            params.sortBy !== "customerid"
                              ? "text-gray-700/50"
                              : params.sort === "asc"
                              ? "text-grayy-700"
                              : "text-gray-700/30"
                          }`}
                          name="customerid"
                          value="asc"
                          onClick={handleSort}
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
                          onClick={handleSort}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                      </div>
                    </div>
                  </th>
                  <th className="px-2 py-2 border border-gray-500/25 text-center">
                    <div className="w-full flex justify-between">
                      <h3>Name</h3>
                      <div className="icon-thead flex">
                        <button
                          className={`text-sm cursor-pointer hover:text-gray-700 ${
                            params.sortBy !== "name"
                              ? "text-gray-700/50"
                              : params.sort === "asc"
                              ? "text-grayy-700"
                              : "text-gray-700/30"
                          }`}
                          name="name"
                          value="asc"
                          onClick={handleSort}
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
                          name="name"
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
                      <h3>Address</h3>
                      <div className="icon-thead flex">
                        <button
                          className={`text-sm cursor-pointer hover:text-gray-700 ${
                            params.sortBy !== "address"
                              ? "text-gray-700/50"
                              : params.sort === "asc"
                              ? "text-grayy-700"
                              : "text-gray-700/30"
                          }`}
                          name="address"
                          value="asc"
                          onClick={handleSort}
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
                          name="address"
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
                      <h3>Phone</h3>
                      <div className="icon-thead flex">
                        <button
                          className={`text-sm cursor-pointer hover:text-gray-700 ${
                            params.sortBy !== "phone"
                              ? "text-gray-700/50"
                              : params.sort === "asc"
                              ? "text-grayy-700"
                              : "text-gray-700/30"
                          }`}
                          name="phone"
                          value="asc"
                          onClick={handleSort}
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
                          name="phone"
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
                {customers.length > 0 ? (
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
                              router.push(
                                `/customers/edit/${customer.customerid}`
                              )
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
                  ))
                ) : (
                  <tr>
                    <td className="text-center py-6 text-gray-500" colSpan={4}>
                      No Customers Found.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="text-slate-500">
                  <th className="px-2 py-2 border border-gray-500/25 text-center">
                    <h3 className="text-left">Customer id</h3>
                  </th>
                  <th className="px-2 py-2 border border-gray-500/25 text-center">
                    <h3 className="text-left">Name</h3>
                  </th>
                  <th className="px-2 py-2 border border-gray-500/25 text-center">
                    <h3 className="text-left">Address</h3>
                  </th>
                  <th className="px-2 py-2 border border-gray-500/25 text-center">
                    <h3 className="text-left">Phone</h3>
                  </th>
                  <th className="px-2 py-2 border border-gray-500/25 text-center">
                    <h3 className="text-left">Actions</h3>
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
          <ModalDeleteCustomers
            selectedCustomers={selectedCustomers}
            setShowModal={setShowModal}
          />
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
