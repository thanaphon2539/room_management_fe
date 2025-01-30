"use client";

import { useDropdown } from "../context/DropdownContext";

export default function AdminDropdown() {
  const { menuOpen, toggleMenu, dropdownRef } = useDropdown();

  return (
    <div className="w-full flex justify-end mb-4 relative">
      <button
        onClick={(e) => {
          e.stopPropagation(); // ป้องกัน dropdown ปิดโดยไม่ได้ตั้งใจ
          toggleMenu();
        }}
        className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-lg"
      >
        <span className="mr-2">Admin</span>
        <img
          src="/profile.jpg"
          alt="Profile Icon"
          className="w-6 h-6 rounded-full"
        />
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
        >
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Settings
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
