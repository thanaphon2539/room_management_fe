"use client";

interface SidebarProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

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
          🏠 หน้าหลัก
        </button>

        {/* ✅ เมนู User List */}
        <button
          onClick={() => setSelectedMenu("user-list")}
          className={`block px-4 py-2 rounded w-full text-left ${
            selectedMenu === "user-list" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          👤 จัดการผู้ใช้งาน
        </button>
      </nav>
    </aside>
  );
}
