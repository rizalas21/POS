import { ModalDeleteGoods } from "@/components/goods/ModalDelete";
import { useGoodsStore } from "@/stores/goodsStore";
import {
  faArrowDown,
  faArrowUp,
  faCircleInfo,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { getGoods } from "@/features/goods/goods.service";
import GoodsClient from "@/components/goods/GoodsClient";

export default async function Goods({ searchParams }: any) {
  const sp = await searchParams;
  const params = {
    keyword: sp.keyword || "",
    limit: Number(sp.limit) || 3,
    page: Number(sp.page) || 1,
    sortBy: sp.sortBy || "barcode",
    sort: sp.sort || "asc",
  };
  const { data, total, page, pages } = await getGoods(params);
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
        <GoodsClient
          goods={data}
          params={params}
          total={total}
          page={page}
          pages={pages}
          limit={params.limit}
        />
      </div>
    </main>
  );
}
