"use client";

import { useUsersStore } from "@/stores/usersStore";
import { faDatabase, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function EditUsers() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { updateUsers } = useUsersStore();

  const [data, setData] = useState({
    email: "",
    name: "",
    role: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(`/api/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(data);
    };

    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = updateUsers(id, data);
      router.push("/users");
      return Swal.fire({
        icon: "success",
        title: "Update User Successful",
        text: `${(data.email, data.name, data.role)}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      signOut({ redirect: true, callbackUrl: "/" });
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
      <h2 className="text-2xl text-gray-700">Users</h2>

      <div className=" flex flex-col shadow-2xl h-full bg-white">
        <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center mb-2 bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center pl-2">
          <p className="text-blue-600 font-bold">Form Edit</p>
        </div>
        <form className="flex flex-col p-10 gap-5" onSubmit={handleSubmit}>
          <div className="flex justify-between w-full h-[6vh] rounded">
            <label>Email</label>
            <input
              placeholder="Email"
              type="email"
              className="w-4/5 border p-1.5 drop-shadow"
              name="email"
              onChange={handleChange}
              value={data.email}
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
          <div className="flex justify-between w-full">
            <label>Role</label>
            <div className="flex flex-col w-4/5">
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="role"
                  onChange={handleChange}
                  value="operator"
                  checked={data.role.toLocaleLowerCase() === "operator"}
                />
                <span>Operator</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  onChange={handleChange}
                  checked={data.role.toLocaleLowerCase() === "admin"}
                />
                <span>Admin</span>
              </div>
            </div>
          </div>
        </form>
        <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center mb-2 bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center gap-5 px-5 py-2">
          <button
            className="flex w-[8vw] h-full justify-between items-center h-4/5 cursor-pointer bg-green-600"
            type="submit"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon
              className="rounded-l text-center bg-green-700 px-2.5 py-2 text-slate-300 w-1/5 hover:bg-green-800 text-white"
              icon={faDatabase}
            />
            <p className="rounded-l text-center bg-green-500 px-2.5 py-2 text-slate-300 w-4/5 hover:bg-green-800 h-full text-white font-medium">
              Save
            </p>
          </button>
          <button className="flex w-[8vw] h-full justify-between items-center h-4/5 cursor-pointer bg-yellow-600">
            <FontAwesomeIcon
              className="rounded-l text-center bg-yellow-700 px-2.5 py-2 text-slate-300 w-1/5 hover:bg-yellow-800 text-white"
              icon={faUndo}
            />
            <p
              className="rounded-l text-center bg-yellow-500 px-2.5 py-2 text-slate-300 w-4/5 hover:bg-yellow-800 h-full text-white font-medium"
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
