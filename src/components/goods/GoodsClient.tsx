"use client";

import { useState } from "react";
import GoodsSearch from "./GoodsSearch";
import GoodsTable from "./GoodsTable";
import GoodsPagination from "./GoodsPagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Goods, GoodsParams } from "@/types/goods";

export default function GoodsClient({
  goods,
  params,
  page,
  pages,
  total,
  limit,
}: {
  goods: Goods[];
  params: GoodsParams;
  page: number;
  pages: number;
  total: number;
  limit: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [selectedGoods, setSelectedGoods] = useState({
    barcode: "",
    name: "",
    stock: 1,
    purchasePrice: 1,
    sellingPrice: 1,
    unit: "",
    picture: "",
  });

  const handleSort = (e: any) => {
    const { name, value } = e.currentTarget;
    const params = new URLSearchParams(searchParams.toString());

    params.set("sortBy", name);
    params.set("sort", value);

    router.push(`?${params.toString()}`);
  };

  return (
    <section className="table w-full px-4">
      {/* dari search sampe pagination disini */}
      <GoodsSearch page={page} pages={pages} total={total} />
      <GoodsTable
        goods={goods}
        params={params}
        handleSort={handleSort}
        setSelectedGoods={setSelectedGoods}
        setShowModal={setShowModal}
        isLoading={isLoading}
      />
      <GoodsPagination page={page} pages={pages} total={total} limit={limit} />
    </section>
  );
}
