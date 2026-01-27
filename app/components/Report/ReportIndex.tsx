import {
  generateBlankRoomExcel,
  generateCheckInExcel,
  generateCheckOutExcel,
  generateElectricityExcel,
  generateRentExcel,
  generateWaterExcel,
} from "@/pages/api/report";
import "../Room/RoomIndex.css";
import { useState } from "react";
import dayjs from "dayjs";

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

  const monthNow = Number(dayjs().format("MM"));
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedMonth, setSelectedMonth] = useState(monthNow);

  const handleDownloadReport = async () => {
    try {
      if (!selectedSubMenu) {
        alert("กรุณาเลือกรายงานก่อน");
        return;
      }

      // ✅ คำนวณค่าที่จะใช้จริงทันที (กัน state ยังไม่อัปเดต)
      const yearToUse = selectedYear;
      const maxMonth = yearToUse === currentYear ? monthNow : 12;
      const monthToUse = Math.min(selectedMonth, maxMonth);
      const month2 = String(monthToUse).padStart(2, "0");

      // ✅ sync state เฉย ๆ (ไม่เอามาเป็นตัวหลักในการยิง)
      if (monthToUse !== selectedMonth) setSelectedMonth(monthToUse);
      console.log("handleDownloadReport >>>", selectedSubMenu);
      console.log("selectedYear >>>", selectedYear);
      console.log("month2 >>>", Number(month2));
      let response: any;

      if (selectedSubMenu === subMenuReport[0].name) {
        response = await generateRentExcel({
          type: selectedSubMenu,
          year: yearToUse,
          month: Number(month2),
        });
      } else if (selectedSubMenu === subMenuReport[1].name) {
        response = await generateCheckInExcel({
          type: selectedSubMenu,
          year: yearToUse,
          month: Number(month2),
        });
      } else if (selectedSubMenu === subMenuReport[2].name) {
        response = await generateCheckOutExcel({
          type: selectedSubMenu,
          year: yearToUse,
          month: Number(month2),
        });
      } else if (selectedSubMenu === subMenuReport[3].name) {
        response = await generateBlankRoomExcel({
          type: selectedSubMenu,
          year: yearToUse,
          month: Number(month2),
        });
      } else if (selectedSubMenu === subMenuReport[4].name) {
        response = await generateElectricityExcel({
          type: selectedSubMenu,
          year: yearToUse,
          month: Number(month2),
        });
      } else if (selectedSubMenu === subMenuReport[5].name) {
        response = await generateWaterExcel({
          type: selectedSubMenu,
          year: yearToUse,
          month: Number(month2),
        });
      } else {
        throw new Error(`Unknown report type: ${selectedSubMenu}`);
      }

      if (!response?.data) throw new Error("Download failed");

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const contentDisposition = response.headers?.["content-disposition"];
      let filename = "download.xlsx";
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+?)"/);
        if (match?.[1]) filename = match[1];
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error downloading report:", error);
      alert("Download failed");
    }
  };
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
              onChange={(e) => setSelectedYear(Number(e.target.value))}
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
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="input-select"
            >
              {months
                .slice(
                  0,
                  selectedYear === currentYear ? monthNow : months.length,
                )
                .map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
            </select>
            <button
              className="btn btn-primary text-nowrap h-fit"
              onClick={() => handleDownloadReport()}
            >
              <i className="bi bi-file-earmark-arrow-down" />
              <p>Download</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
