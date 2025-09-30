"use client";

import { Purchases } from "@/app/types/purchases";
import LoadingComponent from "@/components/Loading";
import { useAuthStore } from "@/stores/authStore";
import { useGoodsStore } from "@/stores/goodsStore";
import { usePurchasesStore } from "@/stores/purchasesStore";
import { useUnitsStore } from "@/stores/unitsStore";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function addUnits() {
  const router = useRouter();
  const { addPurchases } = usePurchasesStore();
  const { data, status } = useSession();
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(now);
  const [input, setInput] = useState({
    invoice:
      "INV-" + new Date().toISOString().slice(0, 10).split("-").join("") + "-1",
    time: new Date(),
    totalsum: 1,
    supplier: 1,
    operator: data?.user.id || "",
    items: [],
  });
  const [item, setItem] = useState({
    invoice: input.invoice,
    itemcode: "",
    quantity: 0,
    purchasePrice: 0,
    totalPrice: 0,
  });
  const [goodsItem, setGoodsItem] = useState({
    barcode: "",
    name: "",
    stock: "",
  });
  const [params, setParams] = useState({
    keyword: "",
    limit: "0",
    page: "",
    sortBy: "",
    sort: "",
  });

  const { goods, getGoods } = useGoodsStore();
  const { purchases } = usePurchasesStore();
  const handleSubmit = async () => {
    try {
      const res = await addPurchases(input);
      router.push("/purchases");
      return res;
    } catch (error) {
      return null;
    }
  };

  const handleChangeItem = (e: any) => {
    const { name, value } = e.target;
    const newValue = Number(value);
    if (name === "purchasePrice" || name === "quantity") {
      const updatedItem = {
        ...item,
        [name]: newValue,
      };

      setItem({
        ...updatedItem,
        totalPrice: updatedItem.purchasePrice * updatedItem.quantity,
      });
    } else {
      setItem({ ...item, [name]: value });
    }
  };
  const handleChangeIinput = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    getGoods(params);
  }, []);

  if (status === "loading") return <LoadingComponent />;
  console.log(item.totalPrice);

  return (
    <main className="space-y-3">
      <h2 className="text-2xl text-gray-700">Purchases</h2>
      <div className="flex flex-col shadow-2xl h-full bg-white gap-5">
        <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center px-2 py-2">
          <p className="text-4xl text-slate-400 font-bold">Transaction</p>
        </div>
        <form
          className="flex flex-col border-y border-slate-200"
          onSubmit={handleSubmit}
        >
          <section className="flex justify-between py-3 border-y border-slate-200">
            <div className="space-y-2 flex flex-col w-1/3 px-10">
              <label htmlFor="">Invoice</label>
              <input
                type="text"
                className="w-11/12 p-1 drop-shadow bg-slate-200/25 cursor-not-allowed text-slate-800 rounded border border-slate-400"
                disabled
                defaultValue={input.invoice}
              />
            </div>
            <div className="space-y-2 flex flex-col w-1/3">
              <label htmlFor="">Time</label>
              <input
                type="text"
                className="w-11/12 p-1 drop-shadow bg-slate-200/25 cursor-not-allowed text-slate-800 rounded border border-slate-400"
                disabled
                defaultValue={formattedDate}
              />
            </div>
            <div className="space-y-2 flex flex-col w-1/3">
              <label htmlFor="">Operator</label>
              <input
                type="text"
                className="w-11/12 p-1 drop-shadow bg-slate-200/25 cursor-not-allowed text-slate-800 rounded border border-slate-400"
                disabled
                defaultValue={data?.user.name}
              />
            </div>
          </section>
          <section className="flex justify-between py-3">
            <div className="space-y-2 flex flex-col w-1/3 px-10">
              <label htmlFor="">Goods Barcode</label>
              <select
                className="w-11/12 p-1 drop-shadow text-slate-800 rounded border border-slate-400"
                required
                onChange={(e) => {
                  const selectedBarcode = e.target.value;
                  const selectedItem = goods.find(
                    (item) => item.barcode === selectedBarcode
                  );

                  if (selectedItem) {
                    setGoodsItem({
                      barcode: selectedItem.barcode,
                      name: selectedItem.name,
                      stock: String(selectedItem.stock),
                    });
                  }
                }}
              >
                <option value="">Choose Goods</option>
                {goods.length > 0
                  ? goods.map((item) => (
                      <option key={item.barcode} value={item.barcode}>
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
                className="w-11/12 p-1 drop-shadow bg-slate-200/25 cursor-not-allowed text-slate-800 rounded border border-slate-400"
                defaultValue={goodsItem.name}
                disabled
              />
            </div>
            <div className="space-y-2 flex flex-col w-1/3">
              <label htmlFor="">Stock</label>
              <input
                type="number"
                className="w-11/12 p-1 drop-shadow bg-slate-200/25 cursor-not-allowed text-slate-800 rounded border border-slate-400"
                defaultValue={goodsItem.stock}
                disabled
              />
            </div>
          </section>
          <section className="flex justify-between py-3">
            <div className="space-y-2 flex flex-col w-1/3 px-10">
              <label htmlFor="">Purchase Price</label>
              <input
                className="w-11/12 p-1 drop-shadow text-slate-800 rounded border border-slate-400"
                type="number"
                onChange={(e) => handleChangeItem(e)}
                name="purchasePrice"
              />
            </div>
            <div className="space-y-2 flex flex-col w-1/3">
              <label htmlFor="">Qty</label>
              <input
                type="number"
                className="w-11/12 p-1 drop-shadow text-slate-800 rounded border border-slate-400"
                onChange={(e) => handleChangeItem(e)}
                name="quantity"
              />
            </div>
            <div className="space-y-2 flex flex-col w-1/3">
              <label htmlFor="">Total Price</label>
              <input
                type="number"
                className="w-11/12 p-1 drop-shadow bg-slate-200/25 cursor-not-allowed text-slate-800 rounded border border-slate-400"
                onChange={(e) => handleChangeItem(e)}
                name="totalPrice"
                value={item.totalPrice}
                disabled
              />
            </div>
          </section>
          <section className="flex justify-between py-3 px-10">
            <button
              className="flex justify-center items-center text-white font-medium rounded-md text-center hover:bg-blue-800 transition-all duration-200 cursor-pointer"
              onClick={() => input.items.push()}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="text-blue-800 bg-blue-700 px-3 py-2 text-white w-[2.5vw] h-[2.5vw] rounded-l-md"
              />
              <p className="rounded-r-md text-center bg-blue-600 px-4 py-1 text-base hover:bg-blue-700 w-[auto]">
                Add
              </p>
            </button>
          </section>
        </form>
        <table className="w-auto table-auto px-10 w-full">
          <thead className="w-full px-10">
            <tr className="flex justify-center text-slate-500">
              <th className="flex justify-between w-2/12 px-2 py-2 border-y border-gray-500/25 text-center">
                <h3>No.</h3>
              </th>
              <th className="flex justify-between w-3/12 px-2 py-2 border-y  border-gray-500/25 text-center">
                <h3>Barcode</h3>
              </th>
              <th className="flex justify-between w-5/12 px-2 py-2 border-y  border-gray-500/25 text-center">
                <h3>Name</h3>
              </th>
              <th className="flex justify-between w-5/12 px-2 py-2 border-y  border-gray-500/25 text-center">
                <h3>Qty</h3>
              </th>
              <th className="flex w-2/12 px-2 py-2 border-y  border-gray-500/25 text-center">
                <h3>Price</h3>
              </th>
              <th className="flex w-2/12 px-2 py-2 border-y  border-gray-500/25 text-center">
                <h3>Total Price</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {purchases.length > 0 ? (
              purchases.map((purchase: Purchases, index: any) => (
                <tr
                  className="flex w-full justify-center text-slate-500"
                  key={index}
                >
                  <td className="w-2/12 px-2 py-2 border  border-gray-500/25 text-center">
                    index
                  </td>
                  <td className="w-3/12 px-2 py-2 border  border-gray-500/25 text-center">
                    Barcode
                  </td>
                  <td className="w-5/12 px-2 py-2 border  border-gray-500/25 text-center">
                    Name
                  </td>
                  <td className="w-5/12 px-2 py-2 border  border-gray-500/25 text-center">
                    Qty
                  </td>
                  <td className="w-2/12 px-2 py-2 border  border-gray-500/25 text-center">
                    Price
                  </td>
                  <td className="w-2/12 px-2 py-2 border  border-gray-500/25 text-center">
                    Total Price
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="bg-slate-100 text-center py-6 text-gray-500 border-y border-slate-200 w-full"
                  colSpan={6}
                >
                  no items
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <section className="px-10 space-y-5">
          <div className="flex justify-between items-center">
            <span>Total Summary</span>
            <input
              className="border rounded border-gray-300 w-4/5"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="flex justify-between items-center">
            <span>Supplier</span>
            <input
              className="border rounded border-gray-300 w-4/5"
              type="text"
              name=""
              id=""
            />
          </div>
        </section>
        <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center gap-5 px-5 py-2">
          <button
            className="flex w-[8vw] h-full justify-between items-center h-4/5 bg-green-600 cursor-pointer"
            type="submit"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon
              className="rounded-l text-center bg-green-700 px-2.5 py-1.5 text-slate-300 w-1/5 text-white"
              icon={faPlus}
            />
            <p className="rounded-l text-center bg-green-500 px-2.5 py-1.5 text-slate-300 w-4/5 hover:bg-green-700 h-full text-white font-medium">
              Finish
            </p>
          </button>
          <button className="flex w-[8vw] h-full justify-between items-center h-4/5 bg-yellow-600">
            <FontAwesomeIcon
              className="rounded-l text-center bg-yellow-700 px-2.5 py-1.5 text-slate-300 w-1/5 text-white cursor-pointer"
              icon={faArrowLeft}
            />
            <p
              className="rounded-l text-center bg-yellow-500 px-2.5 py-1.5 text-slate-300 w-4/5 hover:bg-yellow-700 h-full text-white font-medium cursor-pointer"
              onClick={() => router.back()}
            >
              Back
            </p>
          </button>
        </div>
      </div>
    </main>
  );
}
