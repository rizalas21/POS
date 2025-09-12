"use client";

import { useGoodsStore } from "@/stores/goodsStore";
import { useUnitsStore } from "@/stores/unitsStore";
import { faDatabase, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddGoods() {
  const router = useRouter();
  const { addGoods } = useGoodsStore();
  const { units, getUnits } = useUnitsStore();
  const [data, setData] = useState({
    barcode: "",
    name: "",
    stock: 1,
    purchasePrice: 1,
    sellingPrice: 1,
    unit: "",
    picture: "",
  });
  const [params, setParams] = useState({
    keyword: "",
    limit: "",
    page: "",
    sortBy: "",
    sort: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await addGoods(data);
      router.push("/goods");
      return res;
    } catch (error) {
      return null;
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await getUnits(params);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  });

  return (
    <main className="space-y-3">
      <h2 className="text-2xl text-gray-700">Goods</h2>
      <div className=" flex flex-col shadow-2xl h-full bg-white">
        <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center mb-2 bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center pl-2">
          <p className="text-blue-600 font-bold">Form Add</p>
        </div>
        <form className="flex flex-col p-10 gap-5" onSubmit={handleSubmit}>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Barcode</label>
            <input
              placeholder="Barcode"
              className="w-4/5 border p-1.5 drop-shadow"
              name="barcode"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Name</label>
            <input
              placeholder="Name"
              type="text"
              className="w-4/5 border p-1.5 drop-shadow"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Stock</label>
            <input
              placeholder="eg. 1000"
              type="number"
              className="w-4/5 border p-1.5 drop-shadow"
              name="stock"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Purchase Price</label>
            <input
              placeholder="e.g 1000"
              type="number"
              className="w-4/5 border p-1.5 drop-shadow"
              name="purchasePrice"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Selling Price</label>
            <input
              placeholder="eg. 1000"
              type="number"
              className="w-4/5 border p-1.5 drop-shadow"
              name="sellingPrice"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Unit</label>
            <select name="unit" onChange={(e) => handleChange(e)}>
              <option value="">Choose Unit</option>
              {units.map((item) => (
                <option key={item.unit} value={item.unit}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Picture</label>
            <input
              type="text"
              className="w-4/5 border p-1.5 drop-shadow"
              name="picture"
              onChange={handleChange}
            />
          </div>
        </form>
        <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center mb-2 bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center gap-5 px-5 py-2">
          <button
            className="flex w-[8vw] h-full justify-between items-center h-4/5 bg-green-600 cursor-pointer"
            type="submit"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon
              className="rounded-l text-center bg-green-700 px-2.5 py-2 text-slate-300 w-1/5 text-white"
              icon={faDatabase}
            />
            <p className="rounded-l text-center bg-green-500 px-2.5 py-1 text-slate-300 w-4/5 hover:bg-green-700 h-full text-white font-medium">
              Save
            </p>
          </button>
          <button className="flex w-[8vw] h-full justify-between items-center h-4/5 bg-yellow-600">
            <FontAwesomeIcon
              className="rounded-l text-center bg-yellow-700 px-2.5 py-2 text-slate-300 w-1/5 text-white cursor-pointer"
              icon={faUndo}
            />
            <p
              className="rounded-l text-center bg-yellow-500 px-2.5 py-1 text-slate-300 w-4/5 hover:bg-yellow-700 h-full text-white font-medium cursor-pointer"
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
