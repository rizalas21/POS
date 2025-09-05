"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page() {
  const { status } = useSession();
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get("/api/me");
        setRole(res.data.role);
        return;
      } catch (err) {
        console.error("Failed to fetch role:", err);
      }
    };

    fetchRole();
  }, []);

  console.log("ini null gitu bro => ", role);

  if (role?.toLocaleLowerCase() === "admin")
    return router.replace("/dashboard");

  return router.replace("/sales");
}
