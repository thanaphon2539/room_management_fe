import "../Room/RoomIndex.css";
import RoomIcon from "./../Room/RoomIcon";
import { v4 as uuidv4 } from "uuid";

export default function MainIndex() {
  const header = ["ห้อง", "สถานะ", "วันที่เข้าพัก", "วันที่ออก"];
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
    },
  ];

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
          {items.map((element: any) => {
            return (
              <tbody key={uuidv4()}>
                <tr>
                  <td>{element.name}</td>
                  <td>
                    <RoomIcon item={element.status} />
                  </td>
                  <td>{element.checkin}</td>
                  <td>{element.checkout}</td>
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
