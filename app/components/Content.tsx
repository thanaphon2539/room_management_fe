import RoomList from "./RoomList";
import UserList from "./UserList";
import WaterBill from "./WaterBill";
import ElectricityBill from "./ElectricityBill";
import TestApi from "./TestApi";
import RoomIndex from "./Room/RoomIndex";

import { useState } from "react";

interface ContentProps {
  selectedMenu: string;
}

interface User {
  id: number;
  name: string;
  status: string;
  userType: string;
  waterBill: number;
  electricityBill: number;
}

export default function Content({ selectedMenu }: ContentProps) {
  const [bills, setBills] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      status: "",
      userType: "legalEntity",
      waterBill: 0,
      electricityBill: 0,
    },
  ]);
  return (
    <div className="container">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="w-full">
            {selectedMenu === "home" && (
              <div className="card h-[100vh]">
                <div className="base-table">
                  <table className="base-table">
                    <thead>
                      <tr>
                        <th>ชื่อห้อง</th>
                        <th>สถานะ</th>
                        <th>วันที่เข้าพัก</th>
                        <th>วันที่ออก</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bills.map((row) => (
                        <tr key={row.id}>
                          <td>{row.name}</td>
                          <td>{row.status}</td>
                          <td>{"31/01/2568"}</td>
                          <td>{"31/03/2568"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="w-full">
              {selectedMenu === "user-list" && <UserList />}
              {selectedMenu === "room-list" && <RoomList />}
              {selectedMenu === "water-bill-list" && <WaterBill />}
              {selectedMenu === "electricity-bill-list" && <ElectricityBill />}
              {selectedMenu === "setting-list" && <RoomIndex />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
