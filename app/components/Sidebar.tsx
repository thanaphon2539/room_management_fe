"use client";

interface SidebarProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Sidebar({
  selectedMenu,
  setSelectedMenu,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-center text-xl font-bold border-b border-gray-700">
        Menu
      </div>
      <nav className="flex-1 p-4 space-y-4">
        {/* ✅ เมนู Home */}
        <button
          onClick={() => setSelectedMenu("home")}
          className={`block px-4 py-2 rounded w-full text-left ${
            selectedMenu === "home" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          <i className="bi bi-house-fill" /> หน้าหลัก
        </button>

        {/* ✅ เมนู User List */}
        <button
          onClick={() => setSelectedMenu("user-list")}
          className={`block px-4 py-2 rounded w-full text-left ${
            selectedMenu === "user-list" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          <i className="bi bi-person-fill" /> จัดการผู้ใช้งาน
        </button>

        <button
          onClick={() => setSelectedMenu("room-list")}
          className={`block px-4 py-2 rounded w-full text-left ${
            selectedMenu === "room-list" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          <i className="bi bi-house-gear" /> จัดการห้องเช่า
        </button>

        <button
          onClick={() => setSelectedMenu("water-bill-list")}
          className={`block px-4 py-2 rounded w-full text-left ${
            selectedMenu === "water-bill-list" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          <i className='bi bi-droplet-fill' /> จัดการค่าน้ำ
        </button>

        <button
          onClick={() => setSelectedMenu("electricity-bill-list")}
          className={`block px-4 py-2 rounded w-full text-left ${
            selectedMenu === "electricity-bill-list" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          <i className='bi bi-lightbulb-fill' /> จัดการค่าไฟ
        </button>
        
        <button
          onClick={() => setSelectedMenu("setting-list")}
          className={`block px-4 py-2 rounded w-full text-left ${
            selectedMenu === "setting-list" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          <i className='bi bi-gear' /> จัดการตั้งค่า
        </button>

      </nav>
    </aside>
  );
}
