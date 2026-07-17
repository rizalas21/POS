import toRupiah from "@/lib/toRupiah";
import { Goods } from "@/types/goods";
import {
  faArrowDown,
  faArrowUp,
  faCircleInfo,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import GoodsTableHeader from "./GoodsTable/GoodsTableHeader";
import GoodsTableFooter from "./GoodsTable/GoodsTableFooter";
import { Dispatch, SetStateAction } from "react";
import GoodsTableBody from "./GoodsTable/GoodsTableBody";

interface Props {
  goods: Goods[];
  params: any;
  handleSort: (e: any) => void;
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
  isLoading: boolean;
}

export default function GoodsTable({
  goods,
  params,
  handleSort,
  setSelectedGoods,
  setShowModal,
  isLoading,
}: Props) {
  if (isLoading) {
    return <p className="text-center py-6 text-gray-500">Loading...</p>;
  }

  return (
    <table className="w-auto flex flex-col">
      <GoodsTableHeader params={params} handleSort={handleSort} />
      <GoodsTableBody
        goods={goods}
        setSelectedGoods={setSelectedGoods}
        setShowModal={setShowModal}
      />
      <GoodsTableFooter />
    </table>
  );
}
