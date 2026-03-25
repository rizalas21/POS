"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingComponent from "@/components/Loading";

export default function Page() {
  const { data, status } = useSession();
  const router = useRouter();
  const role = data?.user?.role;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      if (role?.toLocaleLowerCase() === "admin")
        return router.push("/dashboard");
      router.replace("/sales");
    }
  }, [status, router]);

  return <LoadingComponent />;
}
