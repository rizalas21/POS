"use client";

import toRupiah from "@/lib/toRupiah";
import { Goods } from "@/types/goods";
import { faCircleInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function GoodsTableBody({
  goods,
  setSelectedGoods,
  setShowModal,
}: {
  goods: Goods[];
  setSelectedGoods: Dispatch<
    SetStateAction<{
      barcode: string;
      name: string;
      stock: number;
      purchaseprice: number;
      sellingprice: number;
      unit: string;
      picture: string | null;
    }>
  >;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  return (
    <tbody>
      {goods.length > 0 ? (
        goods.map((g: Goods, index: any) => (
          <tr className="flex w-full justify-center text-slate-500" key={index}>
            <td className="min-w-[9vw] min-h-30 px-1 py-2 border border-gray-500/25 text-center">
              {g.barcode}
            </td>
            <td className="min-w-[7vw] min-h-30 px-1 py-2 border border-gray-500/25 text-center">
              {g.name}
            </td>
            <td className="min-w-[7vw] min-h-30 px-1 py-2 border border-gray-500/25 text-center">
              {g.stock}
            </td>
            <td className="min-w-[7vw] min-h-30 px-1 py-2 border border-gray-500/25 text-center">
              {g.unit}
            </td>
            <td className="min-w-[12vw] min-h-30 px-1 py-2 border border-gray-500/25 text-center">
              {toRupiah(g.purchaseprice)}
            </td>
            <td className="min-w-[11vw] min-h-30 px-1 py-2 border border-gray-500/25 text-center">
              {toRupiah(g.sellingprice)}
            </td>
            <td className="min-w-[11vw] px-1 py-2 border border-gray-500/25 text-center">
              {g.picture ? (
                <img
                  src={g.picture}
                  alt={g.name}
                  className="max-w-[9vw] max-h-[12vw] place-self-center"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </td>

            <td className="min-w-[10vw] px-1 py-2 border border-gray-500/25">
              <div className="flex gap-4">
                <button
                  className="text-white hover:cursor-pointer bg-green-600 rounded-full lg:w-10 px-1 py-2 hover:bg-green-800"
                  onClick={() => router.push(`/goods/edit/${g.barcode}`)}
                >
                  <FontAwesomeIcon icon={faCircleInfo} />
                </button>
                <button
                  className="text-white hover:cursor-pointer bg-red-600 rounded-full lg:w-10 px-1 py-2 hover:bg-red-800"
                  onClick={() => {
                    setSelectedGoods(g);
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
  );
}
