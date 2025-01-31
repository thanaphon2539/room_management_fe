import "../Room/RoomIndex.css";
import RoomIcon from "./../Room/RoomIcon";
import { useState } from "react";
import EditBill from "./EditBill";

export default function RoomIndex() {
  const header = [
    "ห้อง",
    "สถานะ",
    "ประเภทลูกค้า",
    "ค่าน้ำเดือนที่แล้ว",
    "ค่าน้ำเดือนปัจจุบัน",
    "หน่วยที่ใช้",
    "จัดการ",
  ];
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
  const [showEdit, setShowEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState();
  const onEdit = (value: boolean) => {
    setShowEdit(false);
  };
  return (
    <div className="container">
      <div className="card space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">จัดการค่าน้ำ</h2>
        </div>

        <div className="flex space-x-2">
          <input type="date" name="search" className="input-text !w-1/4" />
          <button className="btn btn-dark text-nowrap h-fit">
            <i className="bi bi-search" />
            <p>ค้าหา</p>
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              {header.map((element: any) => {
                return <th>{element}</th>;
              })}
            </tr>
          </thead>
          {items.map((element: any) => {
            return (
              <tbody>
                <tr>
                  <td>{element.name}</td>
                  <td>
                    <RoomIcon item={element.status} />
                  </td>
                  <td>
                    <RoomIcon item={element.userType} />
                  </td>
                  <td>{element.bill.old}</td>
                  <td className="text-primary-base font-bold">
                    {element.bill.new}
                  </td>
                  {/* {!showEdit && <td>{element.bill.new}</td>}
                  {showEdit && (
                    <td>
                      <input
                        type="text"
                        className="input-text text-center !border-primary-medium !mb-0"
                        value={element.bill.new}
                      />
                    </td>
                  )} */}
                  <td>{element.bill.new - element.bill.old}</td>
                  <td>
                    <div className="flex justify-center">
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          setShowEdit(true);
                          setDataEdit(element);
                        }}
                      >
                        <i className="bi bi-pencil-fill" />
                        <p>แก้ไข</p>
                      </button>
                      {/* {!showEdit && (
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setShowEdit(true);
                            setDataEdit(element);
                          }}
                        >
                          <i className="bi bi-pencil-fill" />
                          <p>แก้ไข</p>
                        </button>
                      )}
                      {showEdit && (
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            setShowEdit(false);
                            setDataEdit(element);
                          }}
                        >
                          <p>เสร็สิ้น</p>
                        </button>
                      )} */}
                    </div>
                  </td>
                </tr>
                <tr className="h-2" />
              </tbody>
            );
          })}
        </table>
      </div>

      {showEdit && (
        <EditBill
          onAddItem={onEdit}
          onCancel={setShowEdit}
          data={dataEdit}
          state={"Edit"}
        />
      )}
    </div>
  );
}
