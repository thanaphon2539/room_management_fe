"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/navigation";
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
      icon: "bi bi-droplet-half",
    },
    {
      name: "electricity-bill-list",
      title: "จัดการค่าไฟ",
      icon: "bi bi-lightbulb-fill",
    },
    {
      name: "bill-list",
      title: "จัดการบิล",
      icon: "bi bi-receipt",
    },
    {
      name: "report-list",
      title: "รายงาน",
      icon: "bi bi-file-earmark-bar-graph-fill",
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
      title: "รายงานการใช้น้ำ",
    },
  ];

  const router = useRouter();
  let menuBefor = "";
  const setQueryMenu = (menu: string) => {
    if (menuBefor !== menu) {
      localStorage.removeItem("selectedYear");
      localStorage.removeItem("selectedMonth");
    }
    router.push(`/home?menu=${menu}`);
    menuBefor = menu;
  };
  const setQuerySubMenu = (menu: string, subMenu: string) => {
    router.push(`/home?menu=${menu}&subMenu=${subMenu}`);
  };

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
                onClick={() => (
                  setSelectedMenu(element.name),
                  setQueryMenu(element.name)
                )}
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
          className={`flex-1 p-4 space-y-4 border-s border-dark-medium h-[calc(100vh-65px)] transition duration-300 overflow-hidden ${
            showSubBar ? "w-48 opacity-100" : "opacity-0 !w-0 !h-0"
          }`}
        >
          {subMenuReport.map((element: any) => {
            return (
              <button
                key={element.name}
                onClick={() => (
                  setSelectedSubMenu(element.name),
                  setQuerySubMenu("report-list", element.name)
                )}
                className={`menu-nav ${
                  selectedSubMenu === element.name && showSubBar ? "active" : ""
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
