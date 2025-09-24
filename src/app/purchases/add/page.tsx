"use client";

import LoadingComponent from "@/components/Loading";
import { useAuthStore } from "@/stores/authStore";
import { useGoodsStore } from "@/stores/goodsStore";
import { usePurchasesStore } from "@/stores/purchasesStore";
import { useUnitsStore } from "@/stores/unitsStore";
import { faDatabase, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function addUnits() {
  const router = useRouter();
  const { addPurchases } = usePurchasesStore();
  const { data, status } = useSession();
  const [params, setParams] = useState({
    keyword: "",
    limit: "0",
    page: "",
    sortBy: "",
    sort: "",
  });
  const [input, setInput] = useState({
    invoice: "",
    time: "",
    totalsum: 1,
    supplier: 1,
    operator: data?.user.id || "",
  });
  const { goods, getGoods } = useGoodsStore();

  const handleSubmit = async () => {
    try {
      const res = await addPurchases(input);
      router.push("/purchases");
      return res;
    } catch (error) {
      return null;
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    getGoods(params);
  }, []);

  if (status === "loading") return <LoadingComponent />;

  return (
    <main className="space-y-3">
      <h2 className="text-2xl text-gray-700">Purchases</h2>
      <div className=" flex flex-col shadow-2xl h-full bg-white">
        <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center px-2 py-2">
          <p className="text-4xl text-slate-400 font-bold">Transaction</p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <section className="flex justify-between py-3 border-y border-slate-200">
            <div className="space-y-2 flex flex-col w-1/3 px-10">
              <label htmlFor="">Invoice</label>
              <input
                type="text"
                className="w-11/12 p-1 drop-shadow bg-slate-300 cursor-not-allowed text-slate-800 rounded border border-slate-400"
                disabled
              />
            </div>
            <div className="space-y-2 flex flex-col w-1/3">
              <label htmlFor="">Time</label>
              <input
                type="text"
                className="w-11/12 p-1 drop-shadow bg-slate-300 cursor-not-allowed text-slate-800 rounded border border-slate-400"
                disabled
              />
            </div>
            <div className="space-y-2 flex flex-col w-1/3">
              <label htmlFor="">Operator</label>
              <input
                type="text"
                className="w-11/12 p-1 drop-shadow bg-slate-300 cursor-not-allowed text-slate-800 rounded border border-slate-400"
                disabled
                value={data?.user.name}
              />
            </div>
          </section>
          <section className="flex justify-between py-3 border-y border-slate-200">
            <div className="space-y-2 flex flex-col w-1/3 px-10">
              <label htmlFor="">Goods Barcode</label>
              <select className="w-11/12 p-1 drop-shadow text-slate-800 rounded border border-slate-400">
                <option value="">Choose Goods</option>
                {goods.length > 0
                  ? goods.map((item) => (
                      <option key={item.barcode}>
                        {item.barcode} - {item.name}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div className="space-y-2 flex flex-col w-1/3">
              <label htmlFor="">Goods Name</label>
              <input
                type="text"
                className="w-11/12 p-1 drop-shadow bg-slate-300 cursor-not-allowed text-slate-800 rounded border border-slate-400"
                disabled
              />
            </div>
            <div className="space-y-2 flex flex-col w-1/3">
              <label htmlFor="">Stock</label>
              <input
                type="text"
                className="w-11/12 p-1 drop-shadow bg-slate-300 cursor-not-allowed text-slate-800 rounded border border-slate-400"
                disabled
                value={data?.user.name}
              />
            </div>
          </section>
        </form>
        <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center gap-5 px-5 py-2">
          <button
            className="flex w-[8vw] h-full justify-between items-center h-4/5 bg-green-600 cursor-pointer"
            type="submit"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon
              className="rounded-l text-center bg-green-700 px-2.5 py-1.5 text-slate-300 w-1/5 text-white"
              icon={faDatabase}
            />
            <p className="rounded-l text-center bg-green-500 px-2.5 py-1.5 text-slate-300 w-4/5 hover:bg-green-700 h-full text-white font-medium">
              Save
            </p>
          </button>
          <button className="flex w-[8vw] h-full justify-between items-center h-4/5 bg-yellow-600">
            <FontAwesomeIcon
              className="rounded-l text-center bg-yellow-700 px-2.5 py-1.5 text-slate-300 w-1/5 text-white cursor-pointer"
              icon={faUndo}
            />
            <p
              className="rounded-l text-center bg-yellow-500 px-2.5 py-1.5 text-slate-300 w-4/5 hover:bg-yellow-700 h-full text-white font-medium cursor-pointer"
              onClick={() => router.back()}
            >
              Cancel
            </p>
          </button>
        </div>
      </div>
    </main>
  );
}
