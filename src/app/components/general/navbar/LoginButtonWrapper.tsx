"use client";
import { useState, useEffect } from "react";
import LoginButton from "./LoginButton";

interface LoginButtonWrapperProps {
  toggleNavMenu?: () => void;
}

export default function LoginButtonWrapper({ toggleNavMenu }: LoginButtonWrapperProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch("/api/isloggedin");
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error("Failed to check login status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="nav-item flex justify-center items-center gap-2 text-md text-xl"  onClick={toggleNavMenu}>
      <LoginButton loggedIn={isLoggedIn} isLoading={isLoading} handleLogout={handleLogout} />
    </div>
  );
}
