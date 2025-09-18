"use client";

import { useUnitsStore } from "@/stores/unitsStore";
import { useUsersStore } from "@/stores/usersStore";
import { faDatabase, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function EditUnits() {
  const router = useRouter();
  const params = useParams();
  const unit = params.unit as string;
  const { updateUnits } = useUnitsStore();

  const [data, setData] = useState({
    unit: "",
    name: "",
    note: "",
  });

  useEffect(() => {
    const fetchUnits = async () => {
      const { data } = await axios.get(`/api/units/${unit}`);
      setData(data);
    };

    fetchUnits();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await updateUnits(unit, data);
      router.push("/units");
      return Swal.fire({
        icon: "success",
        title: "Update Unit Successful",
        text: `${(data.unit, data.name, data.note)}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log("failed to update units => ", error);
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
  console.log("ini data => ", data);

  return (
    <main className="space-y-3">
      <h2 className="text-2xl text-gray-700">Units</h2>

      <div className=" flex flex-col shadow-2xl h-full bg-white">
        <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center mb-2 bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center pl-2">
          <p className="text-blue-600 font-bold">Form Edit</p>
        </div>
        <form className="flex flex-col p-10 gap-5" onSubmit={handleSubmit}>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Unit</label>
            <input
              placeholder="Units"
              type="text"
              className="w-4/5 border p-1.5 drop-shadow"
              name="unit"
              onChange={handleChange}
              value={data.unit}
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
              value={data.name}
            />
          </div>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Note</label>
            <input
              placeholder="Note"
              type="text"
              className="w-4/5 border p-1.5 drop-shadow"
              name="note"
              onChange={handleChange}
              value={data.note}
            />
          </div>
        </form>
        <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center gap-5 px-5 py-2">
          <button
            className="flex w-[8vw] h-full justify-between items-center h-4/5 cursor-pointer bg-green-600"
            type="submit"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon
              className="rounded-l text-center bg-green-700 px-2.5 py-1.5 text-slate-300 w-1/5 hover:bg-green-800 text-white"
              icon={faDatabase}
            />
            <p className="rounded-l text-center bg-green-500 px-2.5 py-1.5 text-slate-300 w-4/5 hover:bg-green-800 h-full text-white font-medium">
              Save
            </p>
          </button>
          <button className="flex w-[8vw] h-full justify-between items-center h-4/5 cursor-pointer bg-yellow-600">
            <FontAwesomeIcon
              className="rounded-l text-center bg-yellow-700 px-2.5 py-1.5 text-slate-300 w-1/5 hover:bg-yellow-800 text-white"
              icon={faUndo}
            />
            <p
              className="rounded-l text-center bg-yellow-500 px-2.5 py-1.5 text-slate-300 w-4/5 hover:bg-yellow-800 h-full text-white font-medium"
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
