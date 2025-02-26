import {
  billList,
  invoiceBill,
  invoiceBillCopy,
  invoiceBillDetail,
  receiptBill,
  receiptBillCopy,
  ResponseBillList,
} from "@/pages/api/bill";
import "../Room/RoomIndex.css";
import RoomIcon from "./../Room/RoomIcon";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export default function BillIndex() {
  const header = ["ห้อง", "สถานะ", "ประเภทลูกค้า", "ชื่อบริษัท", "จัดการ"];
  const headerPerson = [
    "ห้อง",
    "สถานะ",
    "ประเภทลูกค้า",
    "ข้อมูลผู้ติดต่อ",
    "จัดการ",
  ];
  const headerLegalEntity = [
    "ห้อง",
    "ประเภทลูกค้า",
    "ข้อมูลผู้ติดต่อ",
    "ข้อมูลบริษัท",
    "จัดการ",
  ];

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

  // โหลดค่าที่เก็บไว้ใน localStorage
  const storedYear = Number(localStorage.getItem("selectedYear")) || years[0];
  const storedMonth = Number(localStorage.getItem("selectedMonth")) || 1;

  const [selectedYear, setSelectedYear] = useState(storedYear);
  const [selectedMonth, setSelectedMonth] = useState(storedMonth);
  const [billType, setBillType] = useState("person");
  const [items, setItem] = useState<ResponseBillList[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonthCheck, setselectedMonthCheck] = useState(1);

  // ฟังก์ชันค้นหา
  const handleSearch = async () => {
    setLoading(true);
    console.log(
      "ค้นหาข้อมูลของเดือน:",
      selectedMonth,
      "ปี:",
      selectedYear,
      "type:",
      billType
    );
    const response = await billList({
      year: selectedYear.toString(),
      month: selectedMonth < 9 ? "0" + selectedMonth : selectedMonth.toString(),
      type: billType,
    });
    console.log("handleSearch response >>>", response);
    setItem(response.data);
    setLoading(false);
    setselectedMonthCheck(selectedMonth);
    localStorage.setItem("selectedYear", selectedYear.toString());
    localStorage.setItem("selectedMonth", selectedMonth.toString());
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleBillTypeChange = (type: string) => {
    console.log("handleBillTypeChange >>>", type);
    setBillType(type);
  };

  // โหลดข้อมูลเมื่อ component ถูกสร้างครั้งแรก
  useEffect(() => {
    handleSearch();
    const fetchBill = async () => {
      const response = await billList({
        year: selectedYear.toString(),
        month:
          selectedMonth < 9 ? "0" + selectedMonth : selectedMonth.toString(),
        type: billType,
      });
      console.log("fetchBill response >>>", response);
      setItem(response.data);
      setLoading(false);
    };
    fetchBill();
  }, [billType]); // โหลดครั้งเดียวตอนแรก

  if (loading) return <p>Loading...</p>;

  const handleDownloadInvoiceBill = async (
    nameRoom: string,
    type: string,
    contactName: string
  ) => {
    try {
      /** file ใบแจ้งหนี้ ต้นฉบับ*/
      const responseInv: any = await invoiceBill({
        nameRoom: nameRoom,
        type: type,
        year: selectedYear,
        month: selectedMonth,
      });
      if (!responseInv.data) throw new Error("Download failed");
      // สร้าง Blob URL เพื่อให้ผู้ใช้สามารถดาวน์โหลดไฟล์
      const blobInv = new Blob([responseInv.data], {
        type: "application/pdf",
      });
      const urlInv = window.URL.createObjectURL(blobInv);

      const b = document.createElement("a");
      b.href = urlInv;
      b.download = `invoice-${contactName}-${dayjs().format(
        "YYYY-MM-DD-HH-mm"
      )}.pdf`;
      document.body.appendChild(b);
      b.click();

      window.URL.revokeObjectURL(urlInv);
      document.body.removeChild(b);

      /** file ใบแจ้งหนี้ สำเนา*/
      const responseInvCopy: any = await invoiceBillCopy({
        nameRoom: nameRoom,
        type: type,
        year: selectedYear,
        month: selectedMonth,
      });
      if (!responseInvCopy.data) throw new Error("Download failed");
      // สร้าง Blob URL เพื่อให้ผู้ใช้สามารถดาวน์โหลดไฟล์
      const blobInvCopy = new Blob([responseInvCopy.data], {
        type: "application/pdf",
      });
      const urlInvCopy = window.URL.createObjectURL(blobInvCopy);

      const bCopy = document.createElement("a");
      bCopy.href = urlInvCopy;
      bCopy.download = `invoice-copy-${contactName}-${dayjs().format(
        "YYYY-MM-DD-HH-mm"
      )}.pdf`;
      document.body.appendChild(bCopy);
      bCopy.click();

      window.URL.revokeObjectURL(urlInvCopy);
      document.body.removeChild(bCopy);

      if (type === "legalEntity") {
        /** file รายละเอียด ใบแจ้งหนี้ */
        const responseInvDetail: any = await invoiceBillDetail({
          nameRoom: nameRoom,
          type: type,
          year: selectedYear,
          month: selectedMonth,
        });
        if (!responseInvDetail.data) throw new Error("Download failed");
        // สร้าง Blob URL เพื่อให้ผู้ใช้สามารถดาวน์โหลดไฟล์
        const blobInvDetail = new Blob([responseInvDetail.data], {
          type: "application/pdf",
        });
        const urlInvDetail = window.URL.createObjectURL(blobInvDetail);

        const bDetail = document.createElement("a");
        bDetail.href = urlInvDetail;
        bDetail.download = `invoice-detail-${contactName}-${dayjs().format(
          "YYYY-MM-DD-HH-mm"
        )}.pdf`;
        document.body.appendChild(bDetail);
        bDetail.click();

        window.URL.revokeObjectURL(urlInvDetail);
        document.body.removeChild(bDetail);
      }
    } catch (error) {
      console.log("Error downloading bill:", error);
      alert(`Download failed`);
    }
  };

  const handleDownloadReceiptBill = async (
    nameRoom: string,
    type: string,
    contactName: string
  ) => {
    try {
      /** file ใบเสร็จ ต้นฉบับ*/
      const responseReceipt: any = await receiptBill({
        nameRoom: nameRoom,
        type: type,
        year: selectedYear,
        month: selectedMonth,
      });
      // console.log("responseReceipt >>>", responseReceipt);
      if (!responseReceipt.data) throw new Error("Download failed");
      // สร้าง Blob URL เพื่อให้ผู้ใช้สามารถดาวน์โหลดไฟล์
      const blobReceipt = new Blob([responseReceipt.data], {
        type: "application/pdf",
      });
      const urlReceipt = window.URL.createObjectURL(blobReceipt);

      const b = document.createElement("a");
      b.href = urlReceipt;
      b.download = `receipt-${contactName}-${dayjs().format(
        "YYYY-MM-DD-HH-mm"
      )}.pdf`;
      document.body.appendChild(b);
      b.click();

      window.URL.revokeObjectURL(urlReceipt);
      document.body.removeChild(b);

      /** file ใบเสร็จ สำเนา*/
      const responseReceiptCopy: any = await receiptBillCopy({
        nameRoom: nameRoom,
        type: type,
        year: selectedYear,
        month: selectedMonth,
      });
      if (!responseReceiptCopy.data) throw new Error("Download failed");
      // สร้าง Blob URL เพื่อให้ผู้ใช้สามารถดาวน์โหลดไฟล์
      const blobReceiptCopy = new Blob([responseReceiptCopy.data], {
        type: "application/pdf",
      });
      const urlReceiptCopy = window.URL.createObjectURL(blobReceiptCopy);

      const bCopy = document.createElement("a");
      bCopy.href = urlReceiptCopy;
      bCopy.download = `receipt-copy-${contactName}-${dayjs().format(
        "YYYY-MM-DD-HH-mm"
      )}.pdf`;
      document.body.appendChild(bCopy);
      bCopy.click();

      window.URL.revokeObjectURL(urlReceiptCopy);
      document.body.removeChild(bCopy);
    } catch (error) {
      console.log("Error downloading bill:", error);
      alert(`Download failed`);
    }
  };

  return (
    <div className="container">
      <div className="card space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            จัดการบิล เดือน: {months[selectedMonthCheck - 1]}
          </h2>
        </div>

        <div className="flex">
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
          <div className="border mx-3" />
          <button
            className={`btn text-nowrap h-fit ${
              billType === "person" ? "btn-success" : "btn-gray"
            }`}
            onClick={() => handleBillTypeChange("person")}
          >
            <p>บุคคล</p>
          </button>
          <button
            className={`btn text-nowrap h-fit ${
              billType === "legalEntity" ? "btn-warning" : "btn-gray"
            }`}
            onClick={() => handleBillTypeChange("legalEntity")}
          >
            <p>นิติบุคคล</p>
          </button>
        </div>

        <div className="table-h">
          <table className="table">
            <thead>
              <tr>
                {billType === "person" &&
                  headerPerson.map((element: any) => {
                    return <th key={uuidv4()}>{element}</th>;
                  })}
                {billType === "legalEntity" &&
                  headerLegalEntity.map((element: any) => {
                    return <th key={uuidv4()}>{element}</th>;
                  })}
              </tr>
            </thead>
            {items.map((element: ResponseBillList) => {
              return (
                <tbody key={uuidv4()}>
                  <tr>
                    <td className="truncate-cell" title={element.nameRoom}>
                      {element.nameRoom}
                    </td>
                    {billType === "person" && (
                      <td>
                        <RoomIcon item={element.status} />
                      </td>
                    )}
                    <td>
                      <RoomIcon item={element.type} />
                    </td>
                    <td className="truncate-cell" title={element.contactName}>
                      {element.contactName}
                    </td>
                    {billType === "legalEntity" && (
                      <td className="truncate-cell" title={element.companyName}>
                        {element.companyName}
                      </td>
                    )}
                    <td>
                      <div className="flex justify-center">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            handleDownloadInvoiceBill(
                              element.nameRoom,
                              element.type,
                              element.contactName
                            )
                          }
                        >
                          <i className="bi bi-receipt-cutoff" />
                          <p>สร้างบิล</p>
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handleDownloadReceiptBill(
                              element.nameRoom,
                              element.type,
                              element.contactName
                            )
                          }
                        >
                          <i className="bi bi-receipt-cutoff" />
                          <p>ใบเสร็จ</p>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="h-2" />
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}
