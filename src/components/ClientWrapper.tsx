"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import SideBar from "./SideBar";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbar = pathname === "/login" || pathname === "/register";
  return (
    <SessionProvider>
      <div className="relative flex">
        <div className="fixed w-1/5">{!hideNavbar && <SideBar />}</div>
        <div className="ml-[20%] w-4/5">
          {!hideNavbar && <Navbar />}
          <div className="bg-gray-200/25 pt-[7%] px-[2%] h-screen">
            {children}
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
