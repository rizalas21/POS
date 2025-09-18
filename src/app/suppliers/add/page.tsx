"use client";

import { useSuppliersStore } from "@/stores/suppliersStore";
import { useUnitsStore } from "@/stores/unitsStore";
import { faDatabase, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function addSuppliers() {
  const router = useRouter();
  const { addSuppliers } = useSuppliersStore();
  const [data, setData] = useState({
    supplierid: "",
    name: "",
    address: "",
    phone: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await addSuppliers(data);
      router.push("/suppliers");
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

  return (
    <main className="space-y-3">
      <h2 className="text-2xl text-gray-700">Suppliers</h2>
      <div className=" flex flex-col shadow-2xl h-full bg-white">
        <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center mb-2 bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center pl-2">
          <p className="text-blue-600 font-bold">Form Add</p>
        </div>
        <form className="flex flex-col p-10 gap-5" onSubmit={handleSubmit}>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>name</label>
            <input
              placeholder="Name of Suppliers"
              type="text"
              className="w-4/5 border p-1.5 drop-shadow"
              name="name"
              onChange={handleChange}
              required
              maxLength={100}
            />
          </div>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Address</label>
            <textarea
              placeholder="Address"
              className="w-4/5 border p-1.5 drop-shadow"
              name="address"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Phone</label>
            <input
              placeholder="Phone"
              type="text"
              className="w-4/5 border p-1.5 drop-shadow"
              name="phone"
              onChange={handleChange}
              required
            />
          </div>
        </form>
        <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center gap-5 px-5 py-2">
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
