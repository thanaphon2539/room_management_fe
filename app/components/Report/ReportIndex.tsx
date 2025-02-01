import "../Room/RoomIndex.css";
import { useState } from "react";

export default function ReportIndex(props: { selectedSubMenu: string }) {
  const selectedSubMenu = props.selectedSubMenu;
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
  const findTitleByName = () => {
    const result = subMenuReport.find((item) => item.name === selectedSubMenu);
    return result ? result.title : "";
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
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  return (
    <div className="container">
      <div className="card space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{findTitleByName()}</h2>
        </div>

        <div className="card border border-base-border">
          <h1 className="font-bold mb-4">กรองข้องมูล</h1>
          <div className="flex space-x-2">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear}
              className="input-select"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth}
              className="input-select"
            >
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <button className="btn btn-dark text-nowrap h-fit">
              <i className="bi bi-search" />
              <p>ค้นหา</p>
            </button>
            <button className="btn btn-primary text-nowrap h-fit">
              <i className="bi bi-file-earmark-arrow-down" />
              <p>Download</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
