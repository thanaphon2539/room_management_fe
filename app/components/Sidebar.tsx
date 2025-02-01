"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

interface SidebarProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  selectedSubMenu: string;
  setSelectedSubMenu: (menu: string) => void;
}

export default function Sidebar({
  selectedMenu,
  setSelectedMenu,
  selectedSubMenu,
  setSelectedSubMenu,
}: SidebarProps) {
  const [showSubBar, setShowSubBar] = useState(false);

  useEffect(() => {
    if (selectedMenu === "report-list") setShowSubBar(true);
    else setShowSubBar(false);
  }, [selectedMenu]);

  const menu = [
    {
      name: "home",
      title: "หน้าหลัก",
      icon: "bi bi-house-fill",
    },
    {
      name: "room-list",
      title: "จัดการห้องเช่า",
      icon: "bi bi-house-gear",
    },
    {
      name: "water-bill-list",
      title: "จัดการค่าน้ำ",
      icon: "bi bi-droplet-fill",
    },
    {
      name: "electricity-bill-list",
      title: "จัดการค่าไฟ",
      icon: "bi bi-lightbulb-fill",
    },
    {
      name: "user-list",
      title: "จัดการผู้ใช้งาน",
      icon: "bi bi-person-fill",
    },
    {
      name: "setting-list",
      title: "จัดการตั้งค่า",
      icon: "bi bi-gear",
    },
    {
      name: "report-list",
      title: "รายงาน",
      icon: "bi bi-file-earmark-bar-graph-fill",
    },
  ];
  const subMenuReport = [
    {
      name: "report-rent",
      title: "รายงานบิลค่าเช่ารายเดือน",
    },
    {
      name: "report-in",
      title: "รายงานย้ายเข้ารายเดือน",
    },
    {
      name: "report-out",
      title: "รายงานย้ายออกรายเดือน",
    },
    {
      name: "report-avalible",
      title: "รายงานห้องว่างรายเดือน",
    },
    {
      name: "report-fire",
      title: "รายงานการใช้ไฟ",
    },
    {
      name: "report-water",
      title: "รายการการน้ำ",
    },
  ];
  return (
    <aside
      className={`${
        showSubBar ? "w-96" : "w-64"
      } bg-gray-800 text-white flex flex-col`}
    >
      <div className="p-4 text-center text-xl font-bold border-b border-gray-700">
        Menu
      </div>
      <div className={`${showSubBar ? "grid grid-cols-2" : ""}`}>
        <nav className="flex-1 p-4 space-y-4">
          {/* ✅ เมนู Home */}
          {menu.map((element: any) => {
            return (
              <button
                key={element.name}
                onClick={() => setSelectedMenu(element.name)}
                className={`menu-nav ${
                  selectedMenu === element.name ? "active" : ""
                }`}
              >
                <i className={element.icon} /> {element.title}
              </button>
            );
          })}
        </nav>

        <nav
          className={`flex-1 p-4 space-y-4 border-s border-dark-medium h-screen transition duration-300 overflow-hidden ${
            showSubBar ? "w-48 opacity-100" : "w-0 opacity-0"
          }`}
        >
          {subMenuReport.map((element: any) => {
            return (
              <button
                key={element.name}
                onClick={() => setSelectedSubMenu(element.name)}
                className={`menu-nav ${
                  selectedSubMenu === element.name ? "active" : ""
                }`}
              >
                {element.title}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
