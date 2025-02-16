import "../Room/RoomIndex.css";
import RoomIcon from "./../Room/RoomIcon";
import { useEffect, useState } from "react";
import EditBill from "./EditBill";
import { v4 as uuidv4 } from "uuid";
import {
  findWaterUnit,
  ResponseRoomWaterUnitAndElectricityUnit,
} from "@/pages/api/room";

export default function RoomIndex() {
  const header = [
    "ห้อง",
    "สถานะ",
    "ประเภทลูกค้า",
    "ค่าน้ำเดือนที่แล้ว",
    "ค่าน้ำเดือนปัจจุบัน",
    "หน่วยที่ใช้",
  ];
  const [showEdit, setShowEdit] = useState(false);
  const onEdit = (value: boolean) => {
    console.log(value);
    setShowEdit(false);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [items, setItem] = useState<ResponseRoomWaterUnitAndElectricityUnit[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  // ฟังก์ชันค้นหา
  const handleSearch = async () => {
    setLoading(true);
    console.log("ค้นหาข้อมูลของเดือน:", selectedMonth, "ปี:", selectedYear);
    const data = await findWaterUnit({
      month: selectedMonth,
      year: selectedYear,
    });
    setItem(data);
    setLoading(false);
  };

  // โหลดข้อมูลเมื่อ component ถูกสร้างครั้งแรก
  useEffect(() => {
    handleSearch();
  }, []); // โหลดครั้งเดียวตอนแรก

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="card space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">จัดการค่าน้ำ</h2>
        </div>

        <div className="flex justify-between">
          <div className="flex space-x-2 !w-1/2">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="input-select"
              onKeyDown={handleKeyDown} // Add keydown event here
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="input-select"
              onKeyDown={handleKeyDown} // Add keydown event here
            >
              {months.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <button
              className="btn btn-dark text-nowrap h-fit"
              onClick={handleSearch}
            >
              <i className="bi bi-search" />
              <p>ค้นหา</p>
            </button>
          </div>
          <button
            className="btn btn-warning h-fit ms-auto"
            onClick={() => {
              setShowEdit(true);
            }}
          >
            <i className="bi bi-pencil-fill" />
            <p>จัดการ</p>
          </button>
        </div>

        <div className="table-h">
          <table className="table">
            <thead>
              <tr>
                {header.map((element: any) => {
                  return <th key={uuidv4()}>{element}</th>;
                })}
              </tr>
            </thead>
            {items.map((element: ResponseRoomWaterUnitAndElectricityUnit) => {
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
                    <td>{element.unitBefor}</td>
                    <td className="text-primary-base font-bold">
                      {element.unitAfter}
                    </td>
                    <td>{element.unitAfter - element.unitBefor}</td>
                  </tr>
                  <tr className="h-2" />
                </tbody>
              );
            })}
          </table>
        </div>
      </div>

      {showEdit && (
        <EditBill
          onAddItem={onEdit}
          onCancel={setShowEdit}
          data={items}
          state={"Edit"}
        />
      )}
    </div>
  );
}
