"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function Navigation() {
  const pathname: string = usePathname();

  return (
    <nav className="nav flex gap-2 md:gap-4">
      <Link href="/" className={`nav-item text-md md:text-lg lg:text-xl ${pathname === "/" ? "font-extrabold" : ""}`}>
        Home
      </Link>
      
      <Link href="/mylist" className={`nav-item text-md md:text-lg lg:text-xl ${pathname === "/mylist" ? "font-extrabold" : ""}`}>
        My List
      </Link>

      <Link href="/search" className={`nav-item flex justify-center items-center gap-2 text-md md:text-lg lg:text-xl ${pathname === "/search" ? "font-extrabold" : ""}`}>
        Search <FaSearch />
      </Link>
    </nav>
  );
}