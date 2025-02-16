import { useEffect, useState } from "react";
import "../Room/RoomIndex.css";
import { ResponseRoom, roomList } from "@/pages/api/room";
import RoomIcon from "../Room/RoomIcon";
import { v4 as uuidv4 } from "uuid";
import Pagination from "../Pagination";

export default function MainIndex() {
  const header = [
    "ห้อง",
    "สถานะ",
    "ประเภทลูกค้า",
    "ข้อมูลผู้ติดต่อ",
    "ข้อมูลบริษัท",
    "วันที่เข้าพัก",
    "วันที่ออก",
  ];
  const [loading, setLoading] = useState(true);
  const [items, setItem] = useState<ResponseRoom[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const [totalPages, setTotalPages] = useState(1);

  // ดึงข้อมูลจาก API ตามหน้า
  const fetchRoom = async (page: number, limit: number) => {
    setLoading(true);
    const response = await roomList({ page, limit }); // เรียก API โดยส่ง page และ limit
    setItem(response.data);
    setTotalPages(response.pageCount); // สมมติ API ส่งจำนวนหน้าทั้งหมดมา
    setLoading(false);
  };

  // โหลดข้อมูลเมื่อเปลี่ยนหน้า
  useEffect(() => {
    fetchRoom(currentPage, itemsPerPage);
  }, [currentPage]); // โหลดใหม่ทุกครั้งที่ currentPage เปลี่ยน

  // เปลี่ยนหน้า
  const onChangePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="card space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">รายการห้องเช่า</h2>
        </div>

        <div className="table-h">
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
                    <td>{element.roomContact?.name}</td>
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

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChangePage={onChangePage}
        />
      </div>
    </div>
  );
}
