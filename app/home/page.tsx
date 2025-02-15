"use client";

import React, { useEffect, useState } from "react";
// import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [selectedMenu, setSelectedMenu] = useState("home"); // Handle selected menu
  const [selectedSubMenu, setSelectedSubMenu] = useState("report-rent"); // Handle selected menu
  const [menuOpen, setMenuOpen] = useState(false); // Handle dropdown menu for the profile button

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      let menu = params.get("menu") || "home";
      setSelectedMenu(menu);
      let subMenu = params.get("subMenu") || "report-rent";
      setSelectedSubMenu(subMenu);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const router = useRouter();

  const logout = () => {
    router.push(`/login`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedSubMenu={selectedSubMenu}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-between bg-base-main p-6 relative">
        {/* Top bar with profile button */}
        <div className="w-full flex justify-end mb-4 relative">
          <button onClick={toggleMenu} className="btn btn-primary">
            <span className="mr-2">Admin</span>
            <img
              src="/profile.jpg" // Path to your image file
              alt="Profile Icon"
              className="w-6 h-6 rounded-full"
            />
          </button>
          {menuOpen && (
            <div className="absolute top-12 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Main content */}
        <Content
          selectedMenu={selectedMenu}
          selectedSubMenu={selectedSubMenu}
        />
      </main>
    </div>
  );
};

export default HomePage;
