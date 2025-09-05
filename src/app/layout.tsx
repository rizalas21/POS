"use client";

import ClientWrapper from "@/components/ClientWrapper";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body>
          <ClientWrapper>{children}</ClientWrapper>
        </body>
      </SessionProvider>
    </html>
  );
}
