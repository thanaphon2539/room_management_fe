import UserList from "./UserList";
import WaterBill from "./WaterBill/BillIndex";
import ElectricityBill from "./ElectricityBill/BillIndex";
import RoomIndex from "./Room/RoomIndex";
import MainIndex from "./Main/MainIndex";
import SettingIndex from "./Setting/SettingIndex";
import UserIndex from "./User/UserIndex";
import ReportIndex from "./Report/ReportIndex";
import BillIndex from "./Bill/BillIndex";

import { useState } from "react";

interface ContentProps {
  selectedMenu: string;
  selectedSubMenu: string;
}

export default function Content({
  selectedMenu,
  selectedSubMenu,
}: ContentProps) {
  return (
    <div className="container">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="w-full">
            {selectedMenu === "home" && <MainIndex />}
            {selectedMenu === "user-list" && <UserIndex />}
            {selectedMenu === "room-list" && <RoomIndex />}
            {selectedMenu === "water-bill-list" && <WaterBill />}
            {selectedMenu === "electricity-bill-list" && <ElectricityBill />}
            {selectedMenu === "setting-list" && <SettingIndex />}
            {selectedMenu === "bill-list" && <BillIndex />}
            {selectedMenu === "report-list" && (
              <ReportIndex selectedSubMenu={selectedSubMenu} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
