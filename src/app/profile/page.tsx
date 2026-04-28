"use client";
import { useUsersStore } from "@/stores/usersStore";
import { Users } from "@/types/users";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// isi user state
// userid, email, name, role,

export default function Profile() {
  const { data, status, update } = useSession();
  const [user, setUser] = useState({
    userid: "",
    email: "",
    name: "",
    role: "",
  });
  const router = useRouter();
  const saveUser = async () => {
    const updateUser = await axios.put(`/api/users/${data?.user?.id}`, user);
    if (!updateUser.data.name) {
      return Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the user.",
      });
    }
    update({
      name: user.name,
    });
    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Your changes have been saved successfully.",
    });
    router.back();
  };

  useEffect(() => {
    async function getUser() {
      const resUser = await axios.get(`/api/me/${data?.user?.email}`);
      setUser(resUser.data);
    }
    getUser();
  }, [data, status]);

  return (
    <section
      id="profile"
      className="px-5 py-4 text-slate-900 flex item-center justify-center"
    >
      <div className="bg-white shadow-md rounded w-1/2">
        <div className="bg-slate-100 px-4 py-2 font-semibold text-lg border-b">
          MY PROFILE
        </div>

        <div className="p-5">
          <div className="flex justify-center mb-5">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500">
              A
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                defaultValue={status === "authenticated" ? data?.user.name : ""}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Email</span>
              <span>{status === "authenticated" ? data?.user.email : ""}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Role</span>
              <span>
                {status === "authenticated"
                  ? data?.user.role.toUpperCase()
                  : ""}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <div className="mt-5 flex gap-2">
            <button
              onClick={() => saveUser()}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
            >
              Save Change
            </button>
            <button
              onClick={() => router.back()}
              className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
