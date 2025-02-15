import "../Room/RoomIndex.css";
import RoomIcon from "./../Room/RoomIcon";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function BillIndex() {
  const header = ["ห้อง", "สถานะ", "ประเภทลูกค้า", "จัดการ"];
  const items = [
    {
      id: "1",
      name: "John Doe",
      status: "avalible",
      userType: "person",
      contact: "",
      checkin: "12/12/2568",
      checkout: "12/12/2568",
      rent: [
        { name: "ค่าเช่า", amount: 2000 },
        { name: "ค่าเช่า", amount: 2000 },
      ],
      serviceFee: [{ name: "ค่าบริการ", amount: 2000 }],
      bill: {
        old: 10,
        new: 20,
      },
    },
    {
      id: "2",
      name: "Jane Smith",
      status: "notAvalible",
      userType: "legalEntity",
      contact: "",
      checkin: "12/12/2568",
      checkout: "12/12/2568",
      rent: [{ name: "ค่าเช่า", amount: 2000 }],
      serviceFee: [
        { name: "ค่าบริการ", amount: 2000 },
        { name: "ค่าบริการ", amount: 2000 },
      ],
      bill: {
        old: 30,
        new: 40,
      },
    },
    {
      id: "3",
      name: "HAN.co.th",
      status: "book",
      userType: "",
      contact: "",
      checkin: "12/12/2568",
      checkout: "12/12/2568",
      rent: [{ name: "ค่าเช่า", amount: 2000 }],
      serviceFee: [{ name: "ค่าบริการ", amount: 2000 }],
      bill: {
        old: 50,
        new: 60,
      },
    },
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

  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  return (
    <div className="container">
      <div className="card space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">จัดการบิล</h2>
        </div>

        <div className="flex space-x-2 !w-1/2">
          <select
            value={selectedYear}
            onChange={() => setSelectedYear}
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
            onChange={() => setSelectedMonth}
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
        </div>

        <table className="table">
          <thead>
            <tr>
              {header.map((element: never) => {
                return <th key={uuidv4()}>{element}</th>;
              })}
            </tr>
          </thead>
          {items.map((element: never) => {
            return (
              <tbody key={uuidv4()}>
                <tr>
                  <td>{element.name}</td>
                  <td>
                    <RoomIcon item={element.status} />
                  </td>
                  <td>
                    <RoomIcon item={element.userType} />
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <button className="btn btn-primary">
                        <i className="bi bi-receipt-cutoff" />
                        <p>สร้างบิล</p>
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
  );
}
