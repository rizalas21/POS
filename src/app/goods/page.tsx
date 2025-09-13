"use client";

import { ModalDeleteGoods } from "@/components/goods/ModalDelete";
import { Goods, useGoodsStore } from "@/stores/goodsStore";
import { Units, useUnitsStore } from "@/stores/unitsStore";
import { Users, useUsersStore } from "@/stores/usersStore";
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

export default function units() {
  const [params, setParams] = useState({
    keyword: "",
    limit: "3",
    page: "1",
    sortBy: "barcode",
    sort: "asc",
  });
  const [selectedGoods, setSelectedGoods] = useState({
    barcode: "",
    name: "",
    stock: 1,
    purchasePrice: 1,
    sellingPrice: 1,
    unit: "",
    picture: "",
  });
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { goods, getGoods, page, pages, total } = useGoodsStore();
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
    const fetchGoods = async () => {
      try {
        getGoods(params);
      } catch (error) {
        console.log("error when getGoods");
      } finally {
        setIsloading(false);
      }
    };
    fetchGoods();
  }, [params]);
  return (
    <main className="space-y-3">
      <h1 className="text-2xl text-gray-700">Goods</h1>
      <p>This is data of Goods</p>
      <div className="shadow-2xl h-auto bg-white">
        <div className="w-full h-[8vh] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] mb-2 pl-2 flex justify-start items-center bg-slate-100">
          <Link
            href={"/goods/add"}
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
            <table className="w-auto flex flex-col">
              <thead className="w-full">
                <tr className="flex w-full justify-center text-slate-500">
                  <th className="flex justify-between w-2/12 px-2 py-2 border">
                    <h3>Goods</h3>
                    <div className="icon-thead flex gap-2">
                      <button
                        className={`text-sm cursor-pointer hover:text-gray-700 ${
                          params.sortBy !== "barcode"
                            ? "text-gray-700/50"
                            : params.sort === "asc"
                            ? "text-grayy-700"
                            : "text-gray-700/30"
                        }`}
                        name="barcode"
                        value="asc"
                        onClick={handleSort}
                      >
                        <FontAwesomeIcon icon={faArrowUp} />
                      </button>
                      <button
                        className={`text-sm cursor-pointer hover:text-gray-700 ${
                          params.sortBy !== "barcode"
                            ? "text-gray-700/50"
                            : params.sort === "desc"
                            ? "text-grayy-700"
                            : "text-gray-700/30"
                        }`}
                        name="barcode"
                        value="desc"
                        onClick={handleSort}
                      >
                        <FontAwesomeIcon icon={faArrowDown} />
                      </button>
                    </div>
                  </th>
                  <th className="flex justify-between w-3/12 px-1 py-2 border">
                    <h3>Name</h3>
                    <div className="icon-thead flex gap-2">
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
                  </th>
                  <th className="flex justify-between w-5/12 px-1 py-2 border">
                    <h3>Stock</h3>
                    <div className="icon-thead flex gap-2">
                      <button
                        className={`text-sm cursor-pointer hover:text-gray-700 ${
                          params.sortBy !== "stock"
                            ? "text-gray-700/50"
                            : params.sort === "asc"
                            ? "text-grayy-700"
                            : "text-gray-700/30"
                        }`}
                        name="stock"
                        value="asc"
                        onClick={handleSort}
                      >
                        <FontAwesomeIcon icon={faArrowUp} />
                      </button>
                      <button
                        className={`text-sm cursor-pointer hover:text-gray-700 ${
                          params.sortBy !== "stock"
                            ? "text-gray-700/50"
                            : params.sort === "desc"
                            ? "text-grayy-700"
                            : "text-gray-700/30"
                        }`}
                        name="stock"
                        value="desc"
                        onClick={handleSort}
                      >
                        <FontAwesomeIcon icon={faArrowDown} />
                      </button>
                    </div>
                  </th>
                  <th className="flex justify-between w-5/12 px-1 py-2 border">
                    <h3>Unit</h3>
                    <div className="icon-thead flex gap-2">
                      <button
                        className={`text-sm cursor-pointer hover:text-gray-700 ${
                          params.sortBy !== "unit"
                            ? "text-gray-700/50"
                            : params.sort === "asc"
                            ? "text-grayy-700"
                            : "text-gray-700/30"
                        }`}
                        name="unit"
                        value="asc"
                        onClick={handleSort}
                      >
                        <FontAwesomeIcon icon={faArrowUp} />
                      </button>
                      <button
                        className={`text-sm cursor-pointer hover:text-gray-700 ${
                          params.sortBy !== "unit"
                            ? "text-gray-700/50"
                            : params.sort === "desc"
                            ? "text-grayy-700"
                            : "text-gray-700/30"
                        }`}
                        name="unit"
                        value="desc"
                        onClick={handleSort}
                      >
                        <FontAwesomeIcon icon={faArrowDown} />
                      </button>
                    </div>
                  </th>
                  <th className="flex justify-between w-5/12 px-1 py-2 border">
                    <h3>Purchase Price</h3>
                    <div className="icon-thead flex gap-2">
                      <button
                        className={`text-sm cursor-pointer hover:text-gray-700 ${
                          params.sortBy !== "purcasePrice"
                            ? "text-gray-700/50"
                            : params.sort === "asc"
                            ? "text-grayy-700"
                            : "text-gray-700/30"
                        }`}
                        name="purcasePrice"
                        value="asc"
                        onClick={handleSort}
                      >
                        <FontAwesomeIcon icon={faArrowUp} />
                      </button>
                      <button
                        className={`text-sm cursor-pointer hover:text-gray-700 ${
                          params.sortBy !== "purcasePrice"
                            ? "text-gray-700/50"
                            : params.sort === "desc"
                            ? "text-grayy-700"
                            : "text-gray-700/30"
                        }`}
                        name="purcasePrice"
                        value="desc"
                        onClick={handleSort}
                      >
                        <FontAwesomeIcon icon={faArrowDown} />
                      </button>
                    </div>
                  </th>
                  <th className="flex justify-between w-5/12 px-1 py-2 border">
                    <h3>Selling Price</h3>
                    <div className="icon-thead flex gap-2">
                      <button
                        className={`text-sm cursor-pointer hover:text-gray-700 ${
                          params.sortBy !== "sellingPrice"
                            ? "text-gray-700/50"
                            : params.sort === "asc"
                            ? "text-grayy-700"
                            : "text-gray-700/30"
                        }`}
                        name="sellingPrice"
                        value="asc"
                        onClick={handleSort}
                      >
                        <FontAwesomeIcon icon={faArrowUp} />
                      </button>
                      <button
                        className={`text-sm cursor-pointer hover:text-gray-700 ${
                          params.sortBy !== "sellingPrice"
                            ? "text-gray-700/50"
                            : params.sort === "desc"
                            ? "text-grayy-700"
                            : "text-gray-700/30"
                        }`}
                        name="sellingPrice"
                        value="desc"
                        onClick={handleSort}
                      >
                        <FontAwesomeIcon icon={faArrowDown} />
                      </button>
                    </div>
                  </th>
                  <th className="flex justify-between w-5/12 px-1 py-2 border">
                    <h3>Picture</h3>
                  </th>
                  <th className="flex w-2/12 px-1 py-2 border">
                    <h3>Actions</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {goods.length > 0 ? (
                  goods.map((good: Goods, index: any) => (
                    <tr
                      className="flex w-full justify-center text-slate-500"
                      key={index}
                    >
                      <td className="w-2/12 px-1 py-2 border">
                        {good.barcode}
                      </td>
                      <td className="w-3/12 px-1 py-2 border">{good.name}</td>
                      <td className="w-5/12 px-1 py-2 border">{good.stock}</td>
                      <td className="w-5/12 px-1 py-2 border">{good.unit}</td>
                      <td className="w-5/12 px-1 py-2 border">
                        {good.purchasePrice}
                      </td>
                      <td className="w-5/12 px-1 py-2 border">
                        {good.sellingPrice}
                      </td>
                      <td className="w-5/12 px-1 py-2 border">
                        {good.picture}
                      </td>
                      <td className="w-2/12 px-1 py-2 border">
                        <div className="flex gap-4">
                          <button
                            className="text-white hover:cursor-pointer bg-green-600 w-3/12 rounded-[50%] px-1 py-2 hover:bg-green-800"
                            onClick={() =>
                              router.push(`/goods/edit/${good.barcode}`)
                            }
                          >
                            <FontAwesomeIcon icon={faCircleInfo} />
                          </button>
                          <button
                            className="text-white hover:cursor-pointer bg-red-600 w-3/12 rounded-[50%] px-1 py-2 hover:bg-red-800"
                            onClick={() => {
                              setSelectedGoods({
                                barcode: good.barcode,
                                name: good.name,
                                stock: good.stock,
                                unit: good.unit,
                                purchasePrice: good.purchasePrice,
                                sellingPrice: good.sellingPrice,
                                picture: good.picture,
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
                      No Goods Found.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="w-full">
                <tr className="flex w-full justify-between text-slate-500">
                  <th className="w-2/12 px-1 py-2 border">
                    <h3 className="text-left">Unit</h3>
                  </th>
                  <th className="w-3/12 px-1 py-2 border">
                    <h3 className="text-left">Name</h3>
                  </th>
                  <th className="w-5/12 px-1 py-2 border">
                    <h3 className="text-left">Note</h3>
                  </th>
                  <th className="w-2/12 px-1 py-2 border">
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
          <ModalDeleteGoods
            selectedGoods={selectedGoods}
            setShowModal={setShowModal}
          />
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
