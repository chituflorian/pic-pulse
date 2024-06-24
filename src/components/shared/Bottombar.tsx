"use client";

import { bottombarLinks } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Bottombar = () => {
  const pathname = usePathname();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`bottombar-${link.label}`}
            href={link.route}
            className={`${
              isActive && "bg-primary rounded-[10px] "
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className={`${isActive && "invert-white"}`}
            />

            <p
              className={`tiny-medium text-foreground ${
                isActive && "invert-white"
              }`}
            >
              {link.label}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
