import "../Room/RoomIndex.css";
import RoomIcon from "./../Room/RoomIcon";
import { useEffect, useState } from "react";
import EditBill from "./EditBill";
import { v4 as uuidv4 } from "uuid";
import {
  ResponseRoomWaterUnitAndElectricityUnit,
  findElectricityUnit,
} from "@/pages/api/room";
import dayjs from "dayjs";

export default function BillIndex() {
  const header = [
    "ห้อง",
    "สถานะ",
    "ประเภทลูกค้า",
    "ค่าไฟเดือนที่แล้ว",
    "ค่าไฟเดือนปัจจุบัน",
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

  const monthNow = Number(dayjs().format("MM"));
  // โหลดค่าที่เก็บไว้ใน localStorage
  const storedYear = Number(localStorage.getItem("selectedYear")) || years[0];
  const storedMonth = Number(localStorage.getItem("selectedMonth")) || monthNow;

  const [selectedYear, setSelectedYear] = useState(storedYear);
  const [selectedMonth, setSelectedMonth] = useState(storedMonth);
  const [items, setItem] = useState<ResponseRoomWaterUnitAndElectricityUnit[]>(
    []
  );
  const [selectedMonthCheck, setselectedMonthCheck] = useState(1);
  const [loading, setLoading] = useState(true);

  // ฟังก์ชันค้นหา
  const handleSearch = async () => {
    setLoading(true);
    console.log("ค้นหาข้อมูลของเดือน:", selectedMonth, "ปี:", selectedYear);
    const data = await findElectricityUnit({
      month: selectedMonth,
      year: selectedYear,
    });
    setItem(data);
    setLoading(false);
    setselectedMonthCheck(selectedMonth);
    localStorage.setItem("selectedYear", selectedYear.toString());
    localStorage.setItem("selectedMonth", selectedMonth.toString());
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
          <h2 className="text-2xl font-bold">
            จัดการค่าไฟ เดือน: {months[selectedMonthCheck - 1]}
          </h2>
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
                    <td className="text-error-base font-bold">
                      {element.unitAfter}
                    </td>
                    <td>
                      {element.unitAfter !== 0
                        ? element.unitAfter - element.unitBefor
                        : 0}
                    </td>
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
