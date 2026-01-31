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
import ModalDateBill from "./ModalDateBill";

export default function BillIndex() {
  const header = ["ห้อง", "สถานะ", "ประเภทลูกค้า", "ชื่อบริษัท", "จัดการ"];
  const headerPerson = [
    "ห้อง",
    "สถานะ",
    "ประเภทลูกค้า",
    "ข้อมูลผู้ติดต่อ",
    "ราคา",
    "จัดการ",
  ];
  const headerLegalEntity = [
    "ห้อง",
    "ประเภทลูกค้า",
    "ข้อมูลผู้ติดต่อ",
    "ข้อมูลบริษัท",
    "ราคา",
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

  const [showModal, setShowModal] = useState(false);
  const [dataGetBill, setdataGetBill] = useState({
    nameRoom: "",
    type: "",
    contactName: "",
  });
  const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD"));

  const monthNow = Number(dayjs().format("MM"));
  // โหลดค่าที่เก็บไว้ใน localStorage
  const storedYear = Number(localStorage.getItem("selectedYear")) || years[0];
  const storedMonth = Number(localStorage.getItem("selectedMonth")) || monthNow;

  const [selectedYear, setSelectedYear] = useState(storedYear);
  const [selectedMonth, setSelectedMonth] = useState(storedMonth);
  const [billType, setBillType] = useState("person");
  const [items, setItem] = useState<ResponseBillList[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonthCheck, setselectedMonthCheck] = useState(1);

  // ✅ ย้ายมาไว้ตรงนี้ (ก่อน early return)
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [bulkReceiptMode, setBulkReceiptMode] = useState(false);

  const makeRowKey = (el: ResponseBillList) => `${el.type}::${el.nameRoom}`;

  const toggleRow = (key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleAllVisible = (checked: boolean) => {
    setSelectedKeys(() => {
      if (!checked) return new Set();
      const next = new Set<string>();
      items.forEach((el) => next.add(makeRowKey(el)));
      return next;
    });
  };

  const isAllSelected = items.length > 0 && selectedKeys.size === items.length;

  // ฟังก์ชันค้นหา
  const handleSearch = async () => {
    setLoading(true);
    const maxMonth = selectedYear === currentYear ? monthNow : 12;
    // ใช้เดือนที่จะค้นหา “ทันที” ไม่รอ state update
    const monthToSearch = Math.min(selectedMonth, maxMonth);
    // sync state ให้ UI เปลี่ยนตาม (แต่ไม่เอามาเป็นเงื่อนไขหลักของการยิง)
    if (monthToSearch !== selectedMonth) {
      setSelectedMonth(monthToSearch);
    }
    const response = await billList({
      year: selectedYear.toString(),
      month: String(monthToSearch).padStart(2, "0"),
      type: billType,
    });
    console.log("handleSearch response >>>", response.data);
    setItem(response.data);
    setselectedMonthCheck(monthToSearch);
    localStorage.setItem("selectedYear", selectedYear.toString());
    localStorage.setItem("selectedMonth", monthToSearch.toString());

    setLoading(false);
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
    let alive = true;

    const fetchBills = async () => {
      setLoading(true);
      const maxMonth = selectedYear === currentYear ? monthNow : 12;
      const monthToSearch = Math.min(selectedMonth, maxMonth);

      const response = await billList({
        year: selectedYear.toString(),
        month: String(monthToSearch).padStart(2, "0"),
        type: billType,
      });

      if (!alive) return;

      setItem(response.data);
      setselectedMonthCheck(monthToSearch);
      setLoading(false);
    };

    fetchBills();

    return () => {
      alive = false; // กัน setState จาก request เก่า
    };
  }, [billType]); // โหลดครั้งเดียวตอนแรก

  if (loading) return <p>Loading...</p>;

  const handleDownloadInvoiceBill = async (
    nameRoom: string,
    type: string,
    contactName: string,
  ) => {
    try {
      /** file ใบแจ้งหนี้ */
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
      if (type === "person") {
        b.download = `invoice-${dayjs().format(
          "YYYY-MM-DD-HH-mm",
        )}-${nameRoom}.pdf`;
      } else {
        b.download = `invoice-${contactName}-${dayjs().format(
          "YYYY-MM-DD-HH-mm",
        )}.pdf`;
      }
      document.body.appendChild(b);
      b.click();

      window.URL.revokeObjectURL(urlInv);
      document.body.removeChild(b);
    } catch (error) {
      console.log("Error downloading bill:", error);
      alert(`Download failed`);
    }
  };

  const onSubmitDate = (date: string) => {};

  const handleDownloadReceiptBill = async (
    nameRoom: string,
    type: string,
    contactName: string,
  ) => {
    console.log("date form modal", date);
    try {
      /** file ใบเสร็จ ต้นฉบับ*/
      const responseReceipt: any = await receiptBill({
        nameRoom: nameRoom,
        type: type,
        year: selectedYear,
        month: selectedMonth,
        date: date,
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
      if (type === "person") {
        b.download = `receipt-${dayjs().format(
          "YYYY-MM-DD-HH-mm",
        )}-${nameRoom}.pdf`;
      } else {
        b.download = `receipt-${contactName}-${dayjs().format(
          "YYYY-MM-DD-HH-mm",
        )}.pdf`;
      }
      document.body.appendChild(b);
      b.click();

      window.URL.revokeObjectURL(urlReceipt);
      document.body.removeChild(b);
    } catch (error) {
      console.log("Error downloading bill:", error);
      alert(`Download failed`);
    }
  };

  const handlePrintSelectedInvoices = async () => {
    try {
      const selectedItems = items.filter((el) =>
        selectedKeys.has(makeRowKey(el)),
      );
      if (selectedItems.length === 0) {
        alert("กรุณาเลือกรายการก่อนพิมพ์");
        return;
      }

      // ดาวน์โหลดทีละใบ
      for (const el of selectedItems) {
        const contactOrCompany = el.companyName
          ? el.companyName
          : el.contactName;

        const res: any = await invoiceBill({
          nameRoom: el.nameRoom,
          type: el.type,
          year: selectedYear,
          month: selectedMonth,
        });

        if (!res.data) continue;

        const blob = new Blob([res.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;

        // ตั้งชื่อไฟล์แบบเดียวกับของเดิม
        if (el.type === "person") {
          a.download = `invoice-${dayjs().format("YYYY-MM-DD-HH-mm")}-${el.nameRoom}.pdf`;
        } else {
          a.download = `invoice-${contactOrCompany}-${dayjs().format("YYYY-MM-DD-HH-mm")}.pdf`;
        }

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        // กันโหลดถี่เกิน (บาง browser บล็อก)
        await new Promise((r) => setTimeout(r, 150));
      }
    } catch (e) {
      console.log(e);
      alert("พิมพ์ใบแจ้งหนี้ไม่สำเร็จ");
    }
  };

  const handlePrintSelectedReceipts = async () => {
    try {
      const selectedItems = items.filter((el) =>
        selectedKeys.has(makeRowKey(el)),
      );
      if (selectedItems.length === 0) {
        alert("กรุณาเลือกรายการก่อนพิมพ์");
        return;
      }

      // ดาวน์โหลดทีละใบ
      for (const el of selectedItems) {
        const contactOrCompany = el.companyName
          ? el.companyName
          : el.contactName;

        const res: any = await receiptBill({
          nameRoom: el.nameRoom,
          type: el.type,
          year: selectedYear,
          month: selectedMonth,
          date: date,
        });

        if (!res.data) continue;

        const blob = new Blob([res.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;

        // ตั้งชื่อไฟล์แบบเดียวกับของเดิม
        if (el.type === "person") {
          a.download = `receipt-${dayjs().format(
            "YYYY-MM-DD-HH-mm", 
          )}-${el.nameRoom}.pdf`;
        } else {
          a.download = `receipt-${contactOrCompany}-${dayjs().format(
            "YYYY-MM-DD-HH-mm",
          )}.pdf`;
        }

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        // กันโหลดถี่เกิน (บาง browser บล็อก)
        await new Promise((r) => setTimeout(r, 150));
      }
    } catch (e) {
      console.log(e);
      alert("พิมพ์ใบแจ้งหนี้ไม่สำเร็จ");
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
              className="btn btn-dark text-nowrap h-fit"
              onClick={handleSearch}
            >
              <i className="bi bi-search" />
              <p>ค้นหา</p>
            </button>
          </div>
          <div className="border mx-4" />
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
              billType === "legalEntity" ? "btn-success" : "btn-gray"
            }`}
            onClick={() => handleBillTypeChange("legalEntity")}
          >
            <p>นิติบุคคล</p>
          </button>
          {/* divider */}
          <div className="border mx-4" />
          <button
            className="btn text-nowrap h-fit btn-primary"
            disabled={selectedKeys.size === 0}
            onClick={handlePrintSelectedInvoices}
          >
            พิมพ์ใบแจ้งหนี้ ({selectedKeys.size})
          </button>

          <button
            className="btn text-nowrap h-fit btn-success"
            disabled={selectedKeys.size === 0}
            onClick={handlePrintSelectedReceipts}
          >
            พิมพ์ใบเสร็จ ({selectedKeys.size})
          </button>
        </div>

        <div className="table-h">
          <table className="table">
            <thead>
              <tr>
                <th className="w-[40px] text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => toggleAllVisible(e.target.checked)}
                  />
                </th>

                {billType === "person" &&
                  headerPerson.map((element: any) => (
                    <th key={element}>{element}</th>
                  ))}

                {billType === "legalEntity" &&
                  headerLegalEntity.map((element: any) => (
                    <th key={element}>{element}</th>
                  ))}
              </tr>
            </thead>
            {items.map((element: ResponseBillList) => {
              const rowKey = makeRowKey(element);
              const checked = selectedKeys.has(rowKey);
              return (
                <tbody key={rowKey}>
                  <tr>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleRow(rowKey)}
                      />
                    </td>
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
                    <td className="text-right">
                      <span className="px-3 py-1 rounded bg-yellow-400 inline-block min-w-[110px] text-center">
                        {element.total ?? "-"}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-center">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            handleDownloadInvoiceBill(
                              element.nameRoom,
                              element.type,
                              element.companyName
                                ? element.companyName
                                : element.contactName,
                            )
                          }
                        >
                          <i className="bi bi-receipt-cutoff" />
                          <p>สร้างบิล</p>
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            setShowModal(true);
                            setdataGetBill({
                              nameRoom: element.nameRoom,
                              type: element.type,
                              contactName: element.companyName
                                ? element.companyName
                                : element.contactName,
                            });
                          }}
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

      {showModal && (
        <ModalDateBill
          onChangeDate={setDate}
          onCancel={setShowModal}
          state={showModal}
          onSubmit={() => {
            setShowModal(false);
            handleDownloadReceiptBill(
              dataGetBill.nameRoom,
              dataGetBill.type,
              dataGetBill.contactName,
            );
          }}
        />
      )}
    </div>
  );
}
