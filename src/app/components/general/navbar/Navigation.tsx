"use client";

import { usePathname } from "next/navigation";
import { FaTimes, FaBars, FaSearch } from "react-icons/fa"
import { useState, useEffect } from "react";
import Link from "next/link";
import LoginButtonWrapper from "./LoginButtonWrapper";
  
export default function Navigation() {
  const pathname: string = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const toggleNavMenu = () => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 500);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div className="w-full flex justify-end">
      {/* Hamburgarmeny-knappen */}
      <button
        onClick={toggleNavMenu}
        className="xl:hidden text-4xl mr-8"
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <FaTimes/> : <FaBars />}
      </button>

      <nav className="xl:w-3/6 flex items-center">
        {/*Desktop*/}
        <div className="hidden xl:flex justify-around w-5/6">
          <Link href="/" className={`nav-item flex justify-center items-center text-md md:text-lg lg:text-xl ${pathname === "/" ? "font-extrabold" : ""}`}>
            Home
          </Link>
          
          <Link href="/mylist" className={`nav-item flex justify-center items-center text-md md:text-lg lg:text-xl ${pathname === "/mylist" ? "font-extrabold" : ""}`}>
            My List
          </Link>

          <Link href="/search" className={`nav-item flex justify-center items-center gap-2 text-md md:text-lg lg:text-xl ${pathname === "/search" ? "font-extrabold" : ""}`}>
            Search <FaSearch />
          </Link>

          <LoginButtonWrapper />
        </div>
  
        {/*Mobil*/}
        <div className={`fixed bg-nav z-50 right-0 top-20 bottom-0 pt-8 w-full md:w-3/6 lg:w-2/6 bg-navbar flex flex-col gap-4 items-center overflow-hidden xl:hidden text-xl ${isOpen ? (isAnimating ? "animate-slideOut" : "animate-slideIn") : "hidden"}`}>
          <LoginButtonWrapper toggleNavMenu={toggleNavMenu}/>
          <div>
            <Link href="/" className={`nav-item flex justify-center items-center ${pathname === "/" ? "font-extrabold" : ""}`} onClick={toggleNavMenu} >
              Home
            </Link>
            
            <Link href="/mylist" className={`nav-item flex justify-center items-center ${pathname === "/mylist" ? "font-extrabold" : ""}`} onClick={toggleNavMenu} >
              My List
            </Link>

            <Link href="/search" className={`nav-item flex justify-center items-center gap-2 ${pathname === "/search" ? "font-extrabold" : ""}`} onClick={toggleNavMenu} >
              Search <FaSearch />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}