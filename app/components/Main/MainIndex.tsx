import { useEffect, useState } from "react";
import "../Room/RoomIndex.css";
import { ResponseRoom, roomList } from "@/pages/api/room";
import RoomIcon from "../Room/RoomIcon";
import { v4 as uuidv4 } from "uuid";

export default function MainIndex() {
  const header = [
    "ห้อง",
    "สถานะ",
    "ประเภทลูกค้า",
    "ข้อมูลบริษัท",
    "วันที่เข้าพัก",
    "วันที่ออก",
  ];
  const [loading, setLoading] = useState(true);
  const [items, setItem] = useState<ResponseRoom[]>([]);

  useEffect(() => {
    const fetchRoom = async () => {
      const data = await roomList();
      setItem(data);
      setLoading(false);
    };
    fetchRoom();
  }, []); // ใช้ [] เพื่อให้ useEffect ถูกเรียกแค่ครั้งเดียว

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="card space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">รายการห้องเช่า</h2>
        </div>

        <table className="table">
          <thead>
            <tr>
              {header.map((element: any) => {
                return (
                  <th key={uuidv4()} className="font-bold">
                    {element}
                  </th>
                );
              })}
            </tr>
          </thead>
          {items.map((element: ResponseRoom) => {
            return (
              <tbody key={uuidv4()}>
                <tr>
                  <td>{element.nameRoom}</td>
                  <td>
                    <RoomIcon item={element.status} />
                  </td>
                  <td>
                    <RoomIcon item={element.type} />
                  </td>
                  <td>
                    {element.type === "legalEntity" && element?.roomCompany
                      ? element.roomCompany?.name
                      : ""}
                  </td>
                  <td>{element.dateOfStay}</td>
                  <td>{element.issueDate}</td>
                </tr>
                <tr className="h-2" />
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
