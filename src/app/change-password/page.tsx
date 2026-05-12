"use client";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ChangePassword() {
  const { data } = useSession();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.confirmPassword || !form.newPassword || !form.oldPassword) {
      return setError("All fields are required");
    }

    if (form.newPassword !== form.confirmPassword) {
      return setError("Password confirmation does not match");
    }

    if (form.newPassword.length < 6) {
      return setError("Password must be at least 8 characters");
    }

    try {
      const res = await axios.post("/api/change-password", {
        userid: data?.user.id,
        ...form,
      });
      console.log(res);

      if (!res.data.success) {
        setError(res.data.message);
        return;
      }

      setSuccess(res.data.message);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }

    setForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen flex items-start justify-center mt-10">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Ubah Kata Sandi</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* OLD PASSWORD */}
          <div>
            <label className="block text-sm mb-1">Kata Sandi Lama</label>
            <div className="flex border rounded-lg overflow-hidden">
              <input
                type={show.old ? "text" : "password"}
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 outline-none"
                placeholder="Masukkan password lama"
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, old: !show.old })}
                className="px-3 text-sm text-gray-500"
              >
                <FontAwesomeIcon
                  icon={show.old === true ? faEye : faEyeSlash}
                />
              </button>
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="block text-sm mb-1">Kata Sandi Baru</label>
            <div className="flex border rounded-lg overflow-hidden">
              <input
                type={show.new ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 outline-none"
                placeholder="Masukkan password baru"
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, new: !show.new })}
                className="px-3 text-sm text-gray-500"
              >
                <FontAwesomeIcon
                  icon={show.new === true ? faEye : faEyeSlash}
                />
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm mb-1">Konfirmasi Password</label>
            <div className="flex border rounded-lg overflow-hidden">
              <input
                type={show.confirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 outline-none"
                placeholder="Ulangi password baru"
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, confirm: !show.confirm })}
                className="px-3 text-sm text-gray-500"
              >
                <FontAwesomeIcon
                  icon={show.confirm === true ? faEye : faEyeSlash}
                />
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Perbarui Kata Sandi
          </button>

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="bg-green-100 text-green-600 px-3 py-2 rounded-lg text-sm">
              {success}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
