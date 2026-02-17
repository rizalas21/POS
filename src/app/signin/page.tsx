"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function signin() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForm = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await signIn("auth-session", {
        ...input,
        redirect: false,
      });
      if (!res?.ok || res.error) {
        return Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password.",
        });
      }

      await setInput({ email: "", password: "" });
      router.push("/");
      return Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      return Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Something went wrong during login.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="h-screen w-screen flex justify-center bg-blue-600 items-center absolute left-0 top-0">
      <div className="bg-white flex justify-between h-3/4 w-3/4 rounded-md">
        <div className="flex justify-center items-center text-5xl w-1/2 h-full content-center px-2.5 bg-black">
          <p className="text-white border py-4 px-6 rounded-xl">Sudrajat.dev</p>
        </div>
        <div className="w-1/2 h-full py-5 flex flex-col items-center flex-wrap justify-evenly">
          <h1 className="font-medium text-slate-700 h-auto">Point Of Sales</h1>
          <div className="text-slate-700 h-3/4 w-full flex flex-col items-center p-2.5 my-2.5 border-y border-slate-400">
            <h2 className="font-medium text-3xl mt-2">Welcome Back!</h2>
            <form
              className="flex flex-col w-4/5 h-4/5 items-center py-2"
              onSubmit={(e) => handleForm(e)}
            >
              <input
                className="w-full px-5 py-3.5 m-2.5 border border-slate-300 rounded-3xl"
                placeholder="Enter Email Adress..."
                type="text"
                onChange={(e) => setInput({ ...input, email: e.target.value })}
              />
              <input
                className="w-full px-5 py-3.5 m-2.5 border border-slate-300 rounded-3xl"
                placeholder="Password"
                type="password"
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />
              <div className="w-11/12 flex items-center justify-start m-2.5">
                <input placeholder="Remember Me" type="checkbox" />
                <p className="ml-3">Remember Me</p>
              </div>
              <div className="my-2.5 flex flex-col w-11/12 h-1/2 items-center">
                <button
                  className={`w-full py-3 px-4 rounded-3xl text-white text-lg cursor-pointer hover:bg-blue-900 flex justify-center items-center ${isLoading ? "bg-blue-900" : "bg-blue-700"}`}
                  onClick={(e) => handleForm(e)}
                  type="submit"
                  disabled={isLoading}
                >
                  {!isLoading ? (
                    <p>Login</p>
                  ) : (
                    <svg className="size-4 rounded-full animate-spin border-2 border-t-transparent self-center"></svg>
                  )}
                </button>
              </div>
            </form>
          </div>
          <button className="bg-white w-auto cursor-pointer text-blue-500 text-xs">
            Forgot Password?
          </button>
        </div>
      </div>
    </main>
  );
}
