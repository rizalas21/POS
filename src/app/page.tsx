"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingComponent from "@/components/Loading";

export default function Page() {
  const { status } = useSession();
  const router = useRouter();

  console.log(status);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  return <LoadingComponent />;
}
