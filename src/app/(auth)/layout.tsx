import { redirect } from "next/navigation";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        redirect("/")
      ) : (
        <>
          <section className="flex flex-1 flex-col items-center justify-center py-10">
            {children}
          </section>

          <img
            src="/assets/images/side-img.svg"
            alt="logo"
            className="hidden h-screen w-1/2 bg-no-repeat object-cover xl:block"
          />
        </>
      )}
    </>
  );
}
