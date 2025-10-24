import { Goods } from "@/app/types/goods";
import { Item } from "@/app/types/purchases";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";

export default function PurchaseForm({
  handleAdd,
  input,
  formattedDate,
  data,
  goodsItem,
  goods,
  setGoodsItem,
  item,
  setItem,
  handleChangeItem,
}: {
  handleAdd: (e: any) => void | Promise<void>;
  input: {
    invoice: string;
    time: Date;
    totalsum: number;
    supplier: number;
    operator: string;
    purchaseitems: Item[];
  };
  formattedDate: string;
  data: any;
  goodsItem: { barcode: string; name: string; stock: string };
  goods: Goods[];
  setGoodsItem: Dispatch<
    SetStateAction<{
      barcode: string;
      name: string;
      stock: string;
    }>
  >;
  item: {
    invoice: string;
    itemcode: string;
    quantity: number;
    purchaseprice: number;
    totalprice: number;
  };
  setItem: Dispatch<
    SetStateAction<{
      invoice: string;
      itemcode: string;
      quantity: number;
      purchaseprice: number;
      totalprice: number;
    }>
  >;
  handleChangeItem: (e: React.FormEvent<HTMLInputElement>) => void;
}) {
  return (
    <form
      className="flex flex-col border-y border-slate-200"
      // onSubmit={handleSubmit}
      onSubmit={handleAdd}
    >
      <section className="flex justify-between py-3 border-y border-slate-200">
        <fieldset className="space-y-2 flex flex-col w-1/3 px-10">
          <label htmlFor="invoice">Invoice</label>
          <input
            type="text"
            className="w-11/12 p-1 drop-shadow bg-slate-200/25 cursor-not-allowed text-slate-800 rounded border border-slate-400"
            id="invoice"
            disabled
            value={input.invoice}
          />
        </fieldset>
        <div className="space-y-2 flex flex-col w-1/3">
          <label htmlFor="time">Time</label>
          <input
            type="text"
            className="w-11/12 p-1 drop-shadow bg-slate-200/25 cursor-not-allowed text-slate-800 rounded border border-slate-400"
            id="time"
            disabled
            value={formattedDate}
          />
        </div>
        <div className="space-y-2 flex flex-col w-1/3">
          <label htmlFor="operator">Operator</label>
          <input
            type="text"
            className="w-11/12 p-1 drop-shadow bg-slate-200/25 cursor-not-allowed text-slate-800 rounded border border-slate-400"
            id="operator"
            disabled
            value={data?.user.name}
          />
        </div>
      </section>
      <section className="flex justify-between py-3">
        <div className="space-y-2 flex flex-col w-1/3 px-10">
          <label htmlFor="barcode">Goods Barcode</label>
          <select
            className="w-11/12 p-1 drop-shadow text-slate-800 rounded border border-slate-400"
            id="barcode"
            required
            value={goodsItem.barcode}
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
                setItem({ ...item, itemcode: selectedItem.barcode });
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
          <label htmlFor="name">Goods Name</label>
          <input
            type="text"
            className="w-11/12 p-1 drop-shadow bg-slate-200/25 cursor-not-allowed text-slate-800 rounded border border-slate-400"
            id="name"
            value={goodsItem.name ? goodsItem.name : ""}
            disabled
          />
        </div>
        <div className="space-y-2 flex flex-col w-1/3">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            className="w-11/12 p-1 drop-shadow bg-slate-200/25 cursor-not-allowed text-slate-800 rounded border border-slate-400"
            id="stock"
            value={goodsItem.stock ? goodsItem.stock : ""}
            disabled
          />
        </div>
      </section>
      <section className="flex justify-between py-3">
        <div className="space-y-2 flex flex-col w-1/3 px-10">
          <label htmlFor="purchaseprice">Purchase Price</label>
          <input
            className="w-11/12 p-1 drop-shadow text-slate-800 rounded border border-slate-400"
            id="purchaseprice"
            type="number"
            onChange={(e) => handleChangeItem(e)}
            value={item.purchaseprice ? item.purchaseprice : ""}
            name="purchaseprice"
          />
        </div>
        <div className="space-y-2 flex flex-col w-1/3">
          <label htmlFor="quantity">Qty</label>
          <input
            type="number"
            className="w-11/12 p-1 drop-shadow text-slate-800 rounded border border-slate-400"
            id="quantity"
            onChange={(e) => handleChangeItem(e)}
            value={item.quantity}
            min={1}
            name="quantity"
          />
        </div>
        <div className="space-y-2 flex flex-col w-1/3">
          <label htmlFor="totalprice">Total Price</label>
          <input
            type="number"
            className="w-11/12 p-1 drop-shadow bg-slate-200/25 cursor-not-allowed text-slate-800 rounded border border-slate-400"
            id="totalprice"
            onChange={(e) => handleChangeItem(e)}
            name="totalprice"
            value={item.totalprice}
            disabled
          />
        </div>
      </section>
      <section className="flex justify-between py-3 px-10">
        <button
          className="flex justify-center items-center text-white font-medium rounded-md text-center hover:bg-blue-800 transition-all duration-200 cursor-pointer"
          type="submit"
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
  );
}
