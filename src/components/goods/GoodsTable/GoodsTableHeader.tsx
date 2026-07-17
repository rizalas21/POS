"use client";

import { GoodsParams } from "@/types/goods";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GoodsTableHeader({
  params,
  handleSort,
}: {
  params: GoodsParams;
  handleSort: (e: any) => void;
}) {
  return (
    <thead className="w-full">
      <tr className="flex w-full justify-center text-slate-500">
        <th className="flex justify-between min-w-[9vw] px-2 py-2 border border-gray-500/25 items-center">
          <h3>Barcode</h3>
          <div className="icon-thead flex">
            <button
              className={`text-sm cursor-pointer hover:text-gray-700 ${
                params.sortBy !== "barcode"
                  ? "text-gray-700/50"
                  : params.sort === "asc"
                    ? "text-gray-700"
                    : "text-gray-700/30"
              }`}
              name="barcode"
              value="asc"
              onClick={handleSort}
            >
              <FontAwesomeIcon icon={faArrowUp} size="xs" />
            </button>
            <button
              className={`text-sm cursor-pointer hover:text-gray-700 ${
                params.sortBy !== "barcode"
                  ? "text-gray-700/50"
                  : params.sort === "desc"
                    ? "text-gray-700"
                    : "text-gray-700/30"
              }`}
              name="barcode"
              value="desc"
              onClick={handleSort}
            >
              <FontAwesomeIcon icon={faArrowDown} size="xs" />
            </button>
          </div>
        </th>

        <th className="flex justify-between min-w-[7vw] px-2 py-2 border border-gray-500/25 items-center">
          <h3>Name</h3>
          <div className="icon-thead flex">
            <button
              className={`text-sm cursor-pointer hover:text-gray-700 ${
                params.sortBy !== "name"
                  ? "text-gray-700/50"
                  : params.sort === "asc"
                    ? "text-gray-700"
                    : "text-gray-700/30"
              }`}
              name="name"
              value="asc"
              onClick={handleSort}
            >
              <FontAwesomeIcon icon={faArrowUp} size="xs" />
            </button>
            <button
              className={`text-sm cursor-pointer hover:text-gray-700 ${
                params.sortBy !== "name"
                  ? "text-gray-700/50"
                  : params.sort === "desc"
                    ? "text-gray-700"
                    : "text-gray-700/30"
              }`}
              name="name"
              value="desc"
              onClick={handleSort}
            >
              <FontAwesomeIcon icon={faArrowDown} size="xs" />
            </button>
          </div>
        </th>

        <th className="flex justify-between min-w-[7vw] px-2 py-2 border border-gray-500/25 items-center">
          <h3>Stock</h3>
          <div className="icon-thead flex">
            <button
              className={`text-sm cursor-pointer hover:text-gray-700 ${
                params.sortBy !== "stock"
                  ? "text-gray-700/50"
                  : params.sort === "asc"
                    ? "text-gray-700"
                    : "text-gray-700/30"
              }`}
              name="stock"
              value="asc"
              onClick={handleSort}
            >
              <FontAwesomeIcon icon={faArrowUp} size="xs" />
            </button>
            <button
              className={`text-sm cursor-pointer hover:text-gray-700 ${
                params.sortBy !== "stock"
                  ? "text-gray-700/50"
                  : params.sort === "desc"
                    ? "text-gray-700"
                    : "text-gray-700/30"
              }`}
              name="stock"
              value="desc"
              onClick={handleSort}
            >
              <FontAwesomeIcon icon={faArrowDown} size="xs" />
            </button>
          </div>
        </th>

        <th className="flex justify-between min-w-[7vw] px-2 py-2 border border-gray-500/25 items-center">
          <h3>Unit</h3>
          <div className="icon-thead flex">
            <button
              className={`text-sm cursor-pointer hover:text-gray-700 ${
                params.sortBy !== "unit"
                  ? "text-gray-700/50"
                  : params.sort === "asc"
                    ? "text-gray-700"
                    : "text-gray-700/30"
              }`}
              name="unit"
              value="asc"
              onClick={handleSort}
            >
              <FontAwesomeIcon icon={faArrowUp} size="xs" />
            </button>
            <button
              className={`text-sm cursor-pointer hover:text-gray-700 ${
                params.sortBy !== "unit"
                  ? "text-gray-700/50"
                  : params.sort === "desc"
                    ? "text-gray-700"
                    : "text-gray-700/30"
              }`}
              name="unit"
              value="desc"
              onClick={handleSort}
            >
              <FontAwesomeIcon icon={faArrowDown} size="xs" />
            </button>
          </div>
        </th>

        <th className="flex justify-between min-w-[12vw] px-2 py-2 border border-gray-500/25 items-center">
          <h3>Purchase Price</h3>
          <div className="icon-thead flex">
            <button
              className={`text-sm cursor-pointer hover:text-gray-700 ${
                params.sortBy !== "purchaseprice"
                  ? "text-gray-700/50"
                  : params.sort === "asc"
                    ? "text-gray-700"
                    : "text-gray-700/30"
              }`}
              name="purchaseprice"
              value="asc"
              onClick={handleSort}
            >
              <FontAwesomeIcon icon={faArrowUp} size="xs" />
            </button>
            <button
              className={`text-sm cursor-pointer hover:text-gray-700 ${
                params.sortBy !== "purchaseprice"
                  ? "text-gray-700/50"
                  : params.sort === "desc"
                    ? "text-gray-700"
                    : "text-gray-700/30"
              }`}
              name="purchaseprice"
              value="desc"
              onClick={handleSort}
            >
              <FontAwesomeIcon icon={faArrowDown} size="xs" />
            </button>
          </div>
        </th>

        <th className="flex justify-between min-w-[11vw] px-2 py-2 border border-gray-500/25 items-center">
          <h3>Selling Price</h3>
          <div className="icon-thead flex">
            <button
              className={`text-sm cursor-pointer hover:text-gray-700 ${
                params.sortBy !== "sellingPrice"
                  ? "text-gray-700/50"
                  : params.sort === "asc"
                    ? "text-gray-700"
                    : "text-gray-700/30"
              }`}
              name="sellingPrice"
              value="asc"
              onClick={handleSort}
            >
              <FontAwesomeIcon icon={faArrowUp} size="xs" />
            </button>
            <button
              className={`text-sm cursor-pointer hover:text-gray-700 ${
                params.sortBy !== "sellingPrice"
                  ? "text-gray-700/50"
                  : params.sort === "desc"
                    ? "text-gray-700"
                    : "text-gray-700/30"
              }`}
              name="sellingPrice"
              value="desc"
              onClick={handleSort}
            >
              <FontAwesomeIcon icon={faArrowDown} size="xs" />
            </button>
          </div>
        </th>

        <th className="flex justify-center items-center min-w-[11vw] px-1 py-2 border border-gray-500/25">
          <h3>Picture</h3>
        </th>

        <th className="flex justify-center items-center min-w-[10vw] px-1 py-2 border border-gray-500/25">
          <h3>Actions</h3>
        </th>
      </tr>
    </thead>
  );
}
