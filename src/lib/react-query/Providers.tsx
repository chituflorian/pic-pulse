"use client";

import React from "react";

import { AuthProvider } from "@/context/AuthContext";
import { QueryProvider } from "@/lib/react-query/QueryProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Add other providers nested here as needed
  return (
    <React.StrictMode>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </React.StrictMode>
  );
}
