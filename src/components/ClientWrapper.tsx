"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import SideBar from "./SideBar";
import Footer from "./Footer";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbar = pathname === "/signin" || pathname === "/register";
  return (
    <SessionProvider>
      <div className="relative flex">
        <div className="fixed w-1/5">{!hideNavbar && <SideBar />}</div>
        <div className="ml-[20%] w-4/5">
          {!hideNavbar && <Navbar />}
          <div className="bg-gray-400/25 pt-[7%] px-[2%] pb-15 min-h-screen h-full">
            {children}
          </div>
          {!hideNavbar && <Footer />}
        </div>
      </div>
    </SessionProvider>
  );
}
